import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const audiologists = await prisma.user.findMany({
      where: {
        role: "AUDIOLOGIST",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
      },
      orderBy: { lastName: "asc" },
    });

    return NextResponse.json(
      audiologists.map((a: { id: string; firstName: string; lastName: string; email: string; image: string | null }) => ({
        id: a.id,
        name: `${a.firstName} ${a.lastName}`,
        email: a.email,
        image: a.image,
      }))
    );
  } catch (error) {
    console.error("Error fetching audiologists:", error);
    return NextResponse.json(
      { error: "Failed to fetch audiologists" },
      { status: 500 }
    );
  }
}
