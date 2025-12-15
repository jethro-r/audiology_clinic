import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// POST /api/portal/payments - Create a payment (Stripe integration placeholder)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { invoiceId, amount, paymentMethod } = body;

    if (!invoiceId || !amount) {
      return NextResponse.json(
        { error: "Invoice ID and amount are required" },
        { status: 400 }
      );
    }

    // TODO: Implement Stripe integration for Phase 3
    // This endpoint will handle:
    // 1. Create Stripe PaymentIntent
    // 2. Return client secret for frontend payment form
    // 3. Webhook will handle payment confirmation and update invoice status

    // For now, return a placeholder response indicating Stripe is not yet configured
    if (paymentMethod === "STRIPE" || paymentMethod === "CREDIT_CARD") {
      return NextResponse.json(
        {
          error: "Online payments are not yet available. Please pay in person or via bank transfer.",
          paymentInstructions: {
            bankAccount: "03-0123-0456789-00",
            bankName: "Veritas Hearing",
            reference: invoiceId,
            inPersonOptions: ["EFTPOS", "Cash", "Card"]
          }
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Invalid payment method" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}

// GET /api/portal/payments - Get payment methods available
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return available payment methods
    // When Stripe is integrated, CREDIT_CARD will be enabled
    return NextResponse.json({
      availableMethods: [
        {
          id: "BANK_TRANSFER",
          name: "Bank Transfer",
          enabled: true,
          description: "Transfer to our bank account",
          details: {
            accountNumber: "03-0123-0456789-00",
            accountName: "Veritas Hearing"
          }
        },
        {
          id: "IN_PERSON",
          name: "Pay in Person",
          enabled: true,
          description: "EFTPOS, Cash, or Card at our clinic"
        },
        {
          id: "CREDIT_CARD",
          name: "Credit/Debit Card",
          enabled: false, // Will be enabled when Stripe is integrated
          description: "Pay online with card (Coming soon)"
        },
        {
          id: "ACC",
          name: "ACC Claim",
          enabled: true,
          description: "For noise-induced or accident-related hearing loss"
        },
        {
          id: "INSURANCE",
          name: "Health Insurance",
          enabled: true,
          description: "Southern Cross and other insurers"
        }
      ],
      stripeEnabled: false // Will be true when Stripe is configured
    });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment methods" },
      { status: 500 }
    );
  }
}
