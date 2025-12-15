import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const audiologistId = searchParams.get("audiologistId");
    const date = searchParams.get("date");
    const appointmentTypeId = searchParams.get("appointmentTypeId");

    if (!audiologistId || !date) {
      return NextResponse.json(
        { error: "audiologistId and date are required" },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    // Get the audiologist's availability for this day of week
    const availability = await prisma.availability.findFirst({
      where: {
        audiologistId,
        dayOfWeek,
        isAvailable: true,
      },
    });

    if (!availability) {
      return NextResponse.json({ slots: [] });
    }

    // Get appointment type duration
    let duration = 60; // default duration
    if (appointmentTypeId) {
      const appointmentType = await prisma.appointmentType.findUnique({
        where: { id: appointmentTypeId },
      });
      if (appointmentType) {
        duration = appointmentType.durationMinutes;
      }
    }

    // Get existing appointments for this date
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        audiologistId,
        startTime: { gte: startOfDay },
        endTime: { lte: endOfDay },
        status: { in: ["SCHEDULED", "CONFIRMED"] },
      },
      orderBy: { startTime: "asc" },
    });

    // Get blocked times for this date
    const blockedTimes = await prisma.blockedTime.findMany({
      where: {
        audiologistId,
        startTime: { lte: endOfDay },
        endTime: { gte: startOfDay },
      },
    });

    // Generate available time slots
    const slots = generateTimeSlots(
      availability.startTime,
      availability.endTime,
      duration,
      selectedDate,
      existingAppointments,
      blockedTimes
    );

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

interface Appointment {
  startTime: Date;
  endTime: Date;
}

interface BlockedTime {
  startTime: Date;
  endTime: Date;
}

function generateTimeSlots(
  startTimeStr: string,
  endTimeStr: string,
  durationMinutes: number,
  date: Date,
  existingAppointments: Appointment[],
  blockedTimes: BlockedTime[]
): string[] {
  const slots: string[] = [];

  // Parse start and end times
  const [startHour, startMin] = startTimeStr.split(":").map(Number);
  const [endHour, endMin] = endTimeStr.split(":").map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  // Generate slots in 30-minute intervals
  for (let minutes = startMinutes; minutes + durationMinutes <= endMinutes; minutes += 30) {
    const slotStart = new Date(date);
    slotStart.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);

    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + durationMinutes);

    // Check if slot is in the past
    if (slotStart <= new Date()) {
      continue;
    }

    // Check if slot conflicts with existing appointments
    const hasConflict = existingAppointments.some((apt) => {
      return slotStart < apt.endTime && slotEnd > apt.startTime;
    });

    // Check if slot conflicts with blocked times
    const isBlocked = blockedTimes.some((block) => {
      return slotStart < block.endTime && slotEnd > block.startTime;
    });

    if (!hasConflict && !isBlocked) {
      // Format time as "9:00 AM"
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const period = hours >= 12 ? "PM" : "AM";
      const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      slots.push(`${displayHour}:${mins.toString().padStart(2, "0")} ${period}`);
    }
  }

  return slots;
}
