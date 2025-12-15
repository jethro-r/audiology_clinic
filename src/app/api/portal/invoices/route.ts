import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// GET - Get patient's own invoices
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      where: { patientId: session.user.id },
      include: {
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
