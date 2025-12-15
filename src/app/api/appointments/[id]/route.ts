import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendAppointmentCancellation } from "@/lib/email";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
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
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Check access - patients can only view their own appointments
    if (
      session.user.role === "PATIENT" &&
      appointment.patientId !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Get existing appointment
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!existingAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Check access
    if (
      session.user.role === "PATIENT" &&
      existingAppointment.patientId !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Patients can only cancel, not reschedule
    if (session.user.role === "PATIENT" && body.status !== "CANCELLED") {
      return NextResponse.json(
        { error: "Patients can only cancel appointments" },
        { status: 403 }
      );
    }

    const updateData: Record<string, unknown> = {};

    // Handle cancellation
    if (body.status === "CANCELLED") {
      updateData.status = "CANCELLED";
      updateData.cancellationReason = body.cancellationReason || null;
    }

    // Admin/Staff can update more fields
    if (["ADMIN", "AUDIOLOGIST", "RECEPTIONIST"].includes(session.user.role)) {
      if (body.status) updateData.status = body.status;
      if (body.notes !== undefined) updateData.notes = body.notes;
      if (body.startTime) {
        const startTime = new Date(body.startTime);
        updateData.startTime = startTime;

        // Recalculate end time if start time changes
        if (existingAppointment.appointmentTypeId) {
          const appointmentType = await prisma.appointmentType.findUnique({
            where: { id: existingAppointment.appointmentTypeId },
          });
          if (appointmentType) {
            const endTime = new Date(startTime);
            endTime.setMinutes(
              endTime.getMinutes() + appointmentType.durationMinutes
            );
            updateData.endTime = endTime;
          }
        }
      }
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: updateData,
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

    // Send cancellation email if status changed to cancelled
    if (body.status === "CANCELLED") {
      try {
        await sendAppointmentCancellation(
          {
            patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
            patientEmail: appointment.patient.email,
            audiologistName: `Dr. ${appointment.audiologist.firstName} ${appointment.audiologist.lastName}`,
            appointmentType: appointment.appointmentType.name,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
          },
          body.cancellationReason
        );
      } catch (emailError) {
        console.error("Failed to send cancellation email:", emailError);
      }
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admins can delete appointments
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
