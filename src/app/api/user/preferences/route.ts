import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

// GET - Get user preferences
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's preferences
    let preferences = await prisma.userPreference.findUnique({
      where: { userId: session.user.id },
    });

    // If no preferences exist, return defaults
    if (!preferences) {
      preferences = {
        id: "",
        userId: session.user.id,
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        reminderHoursBefore: 24,
        marketingEmails: false,
        updatedAt: new Date(),
      };
    }

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 }
    );
  }
}

// PUT - Update user preferences
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      emailNotifications,
      smsNotifications,
      appointmentReminders,
      reminderHoursBefore,
      marketingEmails,
    } = body;

    // Upsert preferences
    const preferences = await prisma.userPreference.upsert({
      where: { userId: session.user.id },
      update: {
        emailNotifications: emailNotifications ?? undefined,
        smsNotifications: smsNotifications ?? undefined,
        appointmentReminders: appointmentReminders ?? undefined,
        reminderHoursBefore: reminderHoursBefore ?? undefined,
        marketingEmails: marketingEmails ?? undefined,
      },
      create: {
        userId: session.user.id,
        emailNotifications: emailNotifications ?? true,
        smsNotifications: smsNotifications ?? false,
        appointmentReminders: appointmentReminders ?? true,
        reminderHoursBefore: reminderHoursBefore ?? 24,
        marketingEmails: marketingEmails ?? false,
      },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error updating preferences:", error);
    return NextResponse.json(
      { error: "Failed to update preferences" },
      { status: 500 }
    );
  }
}
