import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendAppointmentConfirmation } from "@/lib/email";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const upcoming = searchParams.get("upcoming");

    const where: Record<string, unknown> = {};

    // If user is a patient, only show their appointments
    if (session.user.role === "PATIENT") {
      where.patientId = session.user.id;
    }

    // If user is an audiologist, show their appointments
    if (session.user.role === "AUDIOLOGIST") {
      where.audiologistId = session.user.id;
    }

    // Filter by status
    if (status) {
      where.status = status;
    }

    // Filter upcoming appointments
    if (upcoming === "true") {
      where.startTime = { gte: new Date() };
      where.status = { in: ["SCHEDULED", "CONFIRMED"] };
    }

    const appointments = await prisma.appointment.findMany({
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
        audiologist: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        appointmentType: true,
      },
      orderBy: { startTime: "asc" },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
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

    const body = await request.json();

    // Validate required fields
    if (!body.appointmentTypeId || !body.audiologistId || !body.startTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get appointment type for duration
    const appointmentType = await prisma.appointmentType.findUnique({
      where: { id: body.appointmentTypeId },
    });

    if (!appointmentType) {
      return NextResponse.json(
        { error: "Invalid appointment type" },
        { status: 400 }
      );
    }

    // Calculate end time
    const startTime = new Date(body.startTime);
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + appointmentType.durationMinutes);

    // Check for conflicts
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        audiologistId: body.audiologistId,
        status: { in: ["SCHEDULED", "CONFIRMED"] },
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
          {
            AND: [
              { startTime: { gte: startTime } },
              { endTime: { lte: endTime } },
            ],
          },
        ],
      },
    });

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 }
      );
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: session.user.id,
        audiologistId: body.audiologistId,
        appointmentTypeId: body.appointmentTypeId,
        startTime,
        endTime,
        notes: body.notes || null,
        status: "SCHEDULED",
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
        audiologist: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        appointmentType: true,
      },
    });

    // Send confirmation email
    try {
      await sendAppointmentConfirmation({
        patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        patientEmail: appointment.patient.email,
        audiologistName: `Dr. ${appointment.audiologist.firstName} ${appointment.audiologist.lastName}`,
        appointmentType: appointment.appointmentType.name,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
