import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// POST - Record a payment for an invoice
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only staff can record payments
    if (!["ADMIN", "AUDIOLOGIST", "RECEPTIONIST"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { amount, paymentMethod, reference, notes, paidAt } = body;

    // Validate required fields
    if (!amount || !paymentMethod) {
      return NextResponse.json(
        { error: "Amount and payment method are required" },
        { status: 400 }
      );
    }

    // Validate payment method
    const validMethods = [
      "CASH",
      "EFTPOS",
      "CREDIT_CARD",
      "BANK_TRANSFER",
      "ACC",
      "SOUTHERN_CROSS",
      "OTHER_INSURANCE",
    ];
    if (!validMethods.includes(paymentMethod)) {
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 }
      );
    }

    // Get the invoice
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { payments: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (invoice.status === "CANCELLED") {
      return NextResponse.json(
        { error: "Cannot add payment to a cancelled invoice" },
        { status: 400 }
      );
    }

    // Calculate current paid amount
    const currentPaidAmount = invoice.payments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0
    );
    const remainingBalance = Number(invoice.total) - currentPaidAmount;

    if (amount > remainingBalance) {
      return NextResponse.json(
        { error: `Payment amount exceeds remaining balance of $${remainingBalance.toFixed(2)}` },
        { status: 400 }
      );
    }

    // Create the payment
    const payment = await prisma.payment.create({
      data: {
        invoiceId: id,
        amount,
        paymentMethod,
        reference: reference || null,
        notes: notes || null,
        paidAt: paidAt ? new Date(paidAt) : new Date(),
      },
    });

    // Update invoice status based on payment
    const newPaidAmount = currentPaidAmount + amount;
    let newStatus: "PENDING" | "PARTIAL" | "PAID" = "PENDING";

    if (newPaidAmount >= Number(invoice.total)) {
      newStatus = "PAID";
    } else if (newPaidAmount > 0) {
      newStatus = "PARTIAL";
    }

    await prisma.invoice.update({
      where: { id },
      data: { status: newStatus },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error("Error recording payment:", error);
    return NextResponse.json(
      { error: "Failed to record payment" },
      { status: 500 }
    );
  }
}

// GET - Get payments for an invoice
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify invoice exists and user has access
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      select: { patientId: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Patients can only view payments on their own invoices
    if (
      session.user.role === "PATIENT" &&
      invoice.patientId !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const payments = await prisma.payment.findMany({
      where: { invoiceId: id },
      orderBy: { paidAt: "desc" },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
