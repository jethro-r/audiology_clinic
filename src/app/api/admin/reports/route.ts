import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// GET - Get reports/analytics data
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only staff can view reports
    if (!["ADMIN", "AUDIOLOGIST", "RECEPTIONIST"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get("type") || "overview";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Default to last 30 days if no dates provided
    const start = startDate
      ? new Date(startDate)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    switch (reportType) {
      case "overview":
        return await getOverviewReport(start, end);
      case "appointments":
        return await getAppointmentsReport(start, end);
      case "revenue":
        return await getRevenueReport(start, end);
      case "patients":
        return await getPatientsReport(start, end);
      case "staff":
        return await getStaffReport(start, end);
      default:
        return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}

async function getOverviewReport(start: Date, end: Date) {
  // Get appointment stats
  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: { gte: start, lte: end },
    },
    select: { status: true },
  });

  const appointmentStats = {
    total: appointments.length,
    completed: appointments.filter((a) => a.status === "COMPLETED").length,
    cancelled: appointments.filter((a) => a.status === "CANCELLED").length,
    noShow: appointments.filter((a) => a.status === "NO_SHOW").length,
    scheduled: appointments.filter((a) => a.status === "SCHEDULED").length,
  };

  // Get revenue stats
  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: { gte: start, lte: end },
    },
    include: { payments: true },
  });

  const totalBilled = invoices.reduce((sum, inv) => sum + Number(inv.total), 0);
  const totalPaid = invoices.reduce(
    (sum, inv) =>
      sum + inv.payments.reduce((pSum, p) => pSum + Number(p.amount), 0),
    0
  );
  const outstanding = invoices
    .filter((inv) => inv.status !== "PAID" && inv.status !== "CANCELLED")
    .reduce((sum, inv) => sum + Number(inv.total), 0);

  // Get patient stats
  const newPatients = await prisma.user.count({
    where: {
      role: "PATIENT",
      createdAt: { gte: start, lte: end },
    },
  });

  const totalPatients = await prisma.user.count({
    where: { role: "PATIENT" },
  });

  return NextResponse.json({
    period: { start, end },
    appointments: appointmentStats,
    revenue: {
      totalBilled,
      totalPaid,
      outstanding,
      collectionRate: totalBilled > 0 ? (totalPaid / totalBilled) * 100 : 0,
    },
    patients: {
      total: totalPatients,
      new: newPatients,
    },
  });
}

async function getAppointmentsReport(start: Date, end: Date) {
  // Get appointments with details
  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: { gte: start, lte: end },
    },
    include: {
      appointmentType: { select: { name: true, durationMinutes: true } },
      audiologist: { select: { firstName: true, lastName: true } },
    },
    orderBy: { startTime: "asc" },
  });

  // Group by status
  const byStatus = appointments.reduce((acc, apt) => {
    acc[apt.status] = (acc[apt.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by type
  const byType = appointments.reduce((acc, apt) => {
    const typeName = apt.appointmentType.name;
    acc[typeName] = (acc[typeName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by audiologist
  const byAudiologist = appointments.reduce((acc, apt) => {
    const name = `${apt.audiologist.firstName} ${apt.audiologist.lastName}`;
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by day of week
  const byDayOfWeek = appointments.reduce((acc, apt) => {
    const day = new Date(apt.startTime).toLocaleDateString("en-NZ", {
      weekday: "long",
    });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate completion rate
  const completed = appointments.filter((a) => a.status === "COMPLETED").length;
  const completionRate = appointments.length > 0 ? (completed / appointments.length) * 100 : 0;

  return NextResponse.json({
    period: { start, end },
    total: appointments.length,
    completionRate,
    byStatus,
    byType,
    byAudiologist,
    byDayOfWeek,
  });
}

async function getRevenueReport(start: Date, end: Date) {
  // Get invoices with payments
  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: { gte: start, lte: end },
    },
    include: {
      payments: true,
      items: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Summary stats
  const totalInvoiced = invoices.reduce((sum, inv) => sum + Number(inv.total), 0);
  const totalPaid = invoices.reduce(
    (sum, inv) =>
      sum + inv.payments.reduce((pSum, p) => pSum + Number(p.amount), 0),
    0
  );
  const totalOutstanding = totalInvoiced - totalPaid;

  // Group by status
  const byStatus = invoices.reduce((acc, inv) => {
    acc[inv.status] = (acc[inv.status] || 0) + Number(inv.total);
    return acc;
  }, {} as Record<string, number>);

  // Group payments by method
  const allPayments = invoices.flatMap((inv) => inv.payments);
  const byPaymentMethod = allPayments.reduce((acc, payment) => {
    acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + Number(payment.amount);
    return acc;
  }, {} as Record<string, number>);

  // Monthly breakdown
  const byMonth = invoices.reduce((acc, inv) => {
    const month = new Date(inv.createdAt).toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
    });
    if (!acc[month]) {
      acc[month] = { invoiced: 0, paid: 0 };
    }
    acc[month].invoiced += Number(inv.total);
    acc[month].paid += inv.payments.reduce((sum, p) => sum + Number(p.amount), 0);
    return acc;
  }, {} as Record<string, { invoiced: number; paid: number }>);

  return NextResponse.json({
    period: { start, end },
    summary: {
      totalInvoiced,
      totalPaid,
      totalOutstanding,
      invoiceCount: invoices.length,
      averageInvoice: invoices.length > 0 ? totalInvoiced / invoices.length : 0,
    },
    byStatus,
    byPaymentMethod,
    byMonth,
  });
}

async function getPatientsReport(start: Date, end: Date) {
  // Get all patients
  const patients = await prisma.user.findMany({
    where: { role: "PATIENT" },
    select: {
      id: true,
      createdAt: true,
      dateOfBirth: true,
      _count: {
        select: { patientAppointments: true },
      },
    },
  });

  // New patients in period
  const newPatients = patients.filter(
    (p) => p.createdAt >= start && p.createdAt <= end
  ).length;

  // Age distribution
  const now = new Date();
  const ageGroups = {
    "0-17": 0,
    "18-30": 0,
    "31-45": 0,
    "46-60": 0,
    "61-75": 0,
    "76+": 0,
    Unknown: 0,
  };

  patients.forEach((patient) => {
    if (!patient.dateOfBirth) {
      ageGroups["Unknown"]++;
      return;
    }
    const age = Math.floor(
      (now.getTime() - new Date(patient.dateOfBirth).getTime()) /
        (365.25 * 24 * 60 * 60 * 1000)
    );
    if (age < 18) ageGroups["0-17"]++;
    else if (age <= 30) ageGroups["18-30"]++;
    else if (age <= 45) ageGroups["31-45"]++;
    else if (age <= 60) ageGroups["46-60"]++;
    else if (age <= 75) ageGroups["61-75"]++;
    else ageGroups["76+"]++;
  });

  // Appointment frequency
  const appointmentCounts = {
    "0": 0,
    "1-2": 0,
    "3-5": 0,
    "6-10": 0,
    "10+": 0,
  };

  patients.forEach((patient) => {
    const count = patient._count.patientAppointments;
    if (count === 0) appointmentCounts["0"]++;
    else if (count <= 2) appointmentCounts["1-2"]++;
    else if (count <= 5) appointmentCounts["3-5"]++;
    else if (count <= 10) appointmentCounts["6-10"]++;
    else appointmentCounts["10+"]++;
  });

  // Monthly growth
  const monthlyGrowth = patients.reduce((acc, patient) => {
    const month = new Date(patient.createdAt).toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return NextResponse.json({
    period: { start, end },
    summary: {
      total: patients.length,
      newInPeriod: newPatients,
      averageAppointments:
        patients.length > 0
          ? patients.reduce((sum, p) => sum + p._count.patientAppointments, 0) /
            patients.length
          : 0,
    },
    ageDistribution: ageGroups,
    appointmentFrequency: appointmentCounts,
    monthlyGrowth,
  });
}

async function getStaffReport(start: Date, end: Date) {
  // Get audiologists
  const audiologists = await prisma.user.findMany({
    where: { role: "AUDIOLOGIST" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      audiologistAppointments: {
        where: {
          startTime: { gte: start, lte: end },
        },
        select: {
          status: true,
          startTime: true,
          endTime: true,
        },
      },
    },
  });

  const staffStats = audiologists.map((audiologist) => {
    const appointments = audiologist.audiologistAppointments;
    const completed = appointments.filter((a) => a.status === "COMPLETED").length;
    const cancelled = appointments.filter((a) => a.status === "CANCELLED").length;
    const noShow = appointments.filter((a) => a.status === "NO_SHOW").length;
    const totalHours = appointments
      .filter((a) => a.status === "COMPLETED")
      .reduce((sum, a) => {
        return sum + (new Date(a.endTime).getTime() - new Date(a.startTime).getTime()) / (1000 * 60 * 60);
      }, 0);

    return {
      id: audiologist.id,
      name: `${audiologist.firstName} ${audiologist.lastName}`,
      totalAppointments: appointments.length,
      completed,
      cancelled,
      noShow,
      completionRate: appointments.length > 0 ? (completed / appointments.length) * 100 : 0,
      totalHours: Math.round(totalHours * 10) / 10,
    };
  });

  return NextResponse.json({
    period: { start, end },
    staff: staffStats,
    summary: {
      totalAudiologists: audiologists.length,
      totalAppointments: staffStats.reduce((sum, s) => sum + s.totalAppointments, 0),
      averageCompletionRate:
        staffStats.length > 0
          ? staffStats.reduce((sum, s) => sum + s.completionRate, 0) / staffStats.length
          : 0,
    },
  });
}
