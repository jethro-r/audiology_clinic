import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// GET - List all invoices (with filters)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only staff can view all invoices
    if (!["ADMIN", "AUDIOLOGIST", "RECEPTIONIST"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const patientId = searchParams.get("patientId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Build filter
    const where: {
      status?: "DRAFT" | "PENDING" | "PAID" | "PARTIAL" | "OVERDUE" | "CANCELLED";
      patientId?: string;
      createdAt?: { gte?: Date; lte?: Date };
    } = {};

    if (status && ["DRAFT", "PENDING", "PAID", "PARTIAL", "OVERDUE", "CANCELLED"].includes(status)) {
      where.status = status as typeof where.status;
    }

    if (patientId) {
      where.patientId = patientId;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        items: true,
        payments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate paid amounts
    const invoicesWithPaidAmount = invoices.map((invoice) => ({
      ...invoice,
      paidAmount: invoice.payments.reduce(
        (sum, payment) => sum + Number(payment.amount),
        0
      ),
    }));

    return NextResponse.json(invoicesWithPaidAmount);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

// POST - Create a new invoice
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only staff can create invoices
    if (!["ADMIN", "AUDIOLOGIST", "RECEPTIONIST"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { patientId, appointmentId, items, dueDate, notes } = body;

    // Validate required fields
    if (!patientId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Patient ID and at least one item are required" },
        { status: 400 }
      );
    }

    // Verify patient exists
    const patient = await prisma.user.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { quantity: number; unitPrice: number }) =>
        sum + item.quantity * item.unitPrice,
      0
    );
    const tax = subtotal * 0.15; // 15% GST for NZ
    const total = subtotal + tax;

    // Generate invoice number (format: INV-YYYYMMDD-XXXX)
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
    const lastInvoice = await prisma.invoice.findFirst({
      where: {
        invoiceNumber: {
          startsWith: `INV-${dateStr}`,
        },
      },
      orderBy: { invoiceNumber: "desc" },
    });

    let sequenceNumber = 1;
    if (lastInvoice) {
      const lastSequence = parseInt(lastInvoice.invoiceNumber.split("-")[2], 10);
      sequenceNumber = lastSequence + 1;
    }

    const invoiceNumber = `INV-${dateStr}-${sequenceNumber.toString().padStart(4, "0")}`;

    // Create invoice with items
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        patientId,
        appointmentId: appointmentId || null,
        subtotal,
        tax,
        total,
        dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
        notes: notes || null,
        status: "PENDING",
        items: {
          create: items.map((item: { description: string; quantity: number; unitPrice: number }) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.quantity * item.unitPrice,
          })),
        },
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        items: true,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
