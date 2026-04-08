import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin, unauthorizedResponse } from "@/lib/admin-auth";

// GET /api/admin/settings - Fetch all settings
export async function GET(request: NextRequest) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const settings = await prisma.setting.findMany({
      orderBy: { key: "asc" },
    });

    // Convert to key-value object
    const settingsObj = settings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      },
      {} as Record<string, string>
    );

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings - Update settings
export async function PUT(request: NextRequest) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json(
        { error: "Invalid settings data" },
        { status: 400 }
      );
    }

    // Update or create each setting
    const updatePromises = Object.entries(settings).map(async ([key, value]) => {
      if (typeof value !== "string") {
        return prisma.setting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
      }
      return prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    });

    await Promise.all(updatePromises);

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
