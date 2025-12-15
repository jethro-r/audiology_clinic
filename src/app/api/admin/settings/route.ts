import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// GET - Get system settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admin can view system settings
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const settings = await prisma.systemSetting.findMany();

    // Convert to key-value object
    const settingsObj = settings.reduce((acc, setting) => {
      try {
        acc[setting.key] = JSON.parse(setting.value);
      } catch {
        acc[setting.key] = setting.value;
      }
      return acc;
    }, {} as Record<string, unknown>);

    // Return with defaults
    return NextResponse.json({
      businessName: settingsObj.businessName || "Veritas Hearing",
      phone: settingsObj.phone || "0800 555 051",
      email: settingsObj.email || "info@veritashearing.co.nz",
      address: settingsObj.address || "42a Hillcrest Road, Hillcrest, Hamilton, 3216",
      timezone: settingsObj.timezone || "Pacific/Auckland",
      currency: settingsObj.currency || "NZD",
      taxRate: settingsObj.taxRate || 15,
      appointmentBuffer: settingsObj.appointmentBuffer || 0,
      defaultAppointmentDuration: settingsObj.defaultAppointmentDuration || 60,
      reminderHoursBefore: settingsObj.reminderHoursBefore || 24,
      allowOnlineBooking: settingsObj.allowOnlineBooking ?? true,
      requireEmailConfirmation: settingsObj.requireEmailConfirmation ?? false,
      ...settingsObj,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT - Update system settings
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admin can update system settings
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    // Update each setting
    const updates = Object.entries(body).map(async ([key, value]) => {
      const stringValue = typeof value === "string" ? value : JSON.stringify(value);
      
      return prisma.systemSetting.upsert({
        where: { key },
        update: { value: stringValue },
        create: { key, value: stringValue },
      });
    });

    await Promise.all(updates);

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
