import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only staff can manage availability
    if (!["ADMIN", "AUDIOLOGIST", "RECEPTIONIST"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const audiologistId = searchParams.get("audiologistId");

    if (!audiologistId) {
      return NextResponse.json(
        { error: "audiologistId is required" },
        { status: 400 }
      );
    }

    const availability = await prisma.availability.findMany({
      where: { audiologistId },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admins and the audiologist themselves can update availability
    if (!["ADMIN", "AUDIOLOGIST"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { audiologistId, availability } = body;

    if (!audiologistId || !availability) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If audiologist, can only update their own availability
    if (
      session.user.role === "AUDIOLOGIST" &&
      audiologistId !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete existing availability for this audiologist
    await prisma.availability.deleteMany({
      where: { audiologistId },
    });

    // Create new availability slots
    if (availability.length > 0) {
      await prisma.availability.createMany({
        data: availability.map(
          (slot: {
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
          }) => ({
            audiologistId,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable,
          })
        ),
      });
    }

    // Fetch and return updated availability
    const updatedAvailability = await prisma.availability.findMany({
      where: { audiologistId },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });

    return NextResponse.json(updatedAvailability);
  } catch (error) {
    console.error("Error saving availability:", error);
    return NextResponse.json(
      { error: "Failed to save availability" },
      { status: 500 }
    );
  }
}
