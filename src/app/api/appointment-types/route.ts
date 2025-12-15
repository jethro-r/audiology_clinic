import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const appointmentTypes = await prisma.appointmentType.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(appointmentTypes);
  } catch (error) {
    console.error("Error fetching appointment types:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment types" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const appointmentType = await prisma.appointmentType.create({
      data: {
        name: body.name,
        description: body.description,
        durationMinutes: body.durationMinutes,
        price: body.price,
        color: body.color || "#0891b2",
        active: body.active ?? true,
        sortOrder: body.sortOrder || 0,
      },
    });

    return NextResponse.json(appointmentType, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment type:", error);
    return NextResponse.json(
      { error: "Failed to create appointment type" },
      { status: 500 }
    );
  }
}
