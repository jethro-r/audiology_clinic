import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  try {
    const contactEmailSetting = await prisma.setting.findUnique({
      where: { key: "contactEmail" },
    });

    return NextResponse.json({
      fromEmail: process.env.FROM_EMAIL || "not set",
      toEmail: contactEmailSetting?.value || process.env.TO_EMAIL || "not configured",
      source: contactEmailSetting?.value ? "database" : "environment",
    });
  } catch (error) {
    return NextResponse.json({
      fromEmail: process.env.FROM_EMAIL || "not set",
      toEmail: process.env.TO_EMAIL || "not configured",
      source: "environment",
    });
  }
}
