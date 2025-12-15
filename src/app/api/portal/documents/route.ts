import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// GET /api/portal/documents - Get user's documents
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: Record<string, unknown> = {
      userId: session.user.id,
    };

    if (category && category !== "all") {
      where.category = category.toUpperCase().replace("-", "_");
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
    });

    // Transform to match UI expectations
    const transformedDocuments = documents.map((doc) => ({
      id: doc.id,
      name: doc.name,
      category: doc.category.toLowerCase().replace("_", "-"),
      date: doc.uploadedAt,
      size: formatFileSize(doc.fileSize),
      type: getFileType(doc.mimeType),
      fileUrl: doc.fileUrl,
    }));

    return NextResponse.json(transformedDocuments);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

// POST /api/portal/documents - Upload a new document
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;
    const name = formData.get("name") as string | null;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: PDF, images, Word documents" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    // In production, upload to cloud storage (S3, etc.)
    // For now, we'll store locally in public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${sanitizedName}`;
    const fileUrl = `/uploads/${session.user.id}/${filename}`;

    // In production, upload to cloud storage here
    // For local development, create a placeholder URL
    // Note: Actual file upload to disk requires additional setup

    const document = await prisma.document.create({
      data: {
        userId: session.user.id,
        name: name || file.name,
        category: category.toUpperCase().replace("-", "_") as "TEST_RESULTS" | "PRESCRIPTIONS" | "INVOICES" | "FORMS" | "OTHER",
        fileUrl,
        fileSize: file.size,
        mimeType: file.type,
      },
    });

    return NextResponse.json(
      {
        id: document.id,
        name: document.name,
        category: document.category.toLowerCase().replace("_", "-"),
        date: document.uploadedAt,
        size: formatFileSize(document.fileSize),
        type: getFileType(document.mimeType),
        fileUrl: document.fileUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getFileType(mimeType: string): "pdf" | "image" | "document" {
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType.startsWith("image/")) return "image";
  return "document";
}
