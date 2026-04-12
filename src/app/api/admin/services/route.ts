import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { slugify } from '@/lib/utils';

// GET - List services with pagination and search
export async function GET(request: NextRequest) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const rawPage = parseInt(searchParams.get('page') || '1', 10);
    const rawLimit = parseInt(searchParams.get('limit') || '10', 10);
    const page = Number.isFinite(rawPage) ? Math.max(1, rawPage) : 1;
    const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(100, rawLimit)) : 10;
    const search = searchParams.get('search')?.trim() || '';

    const id = searchParams.get('id');
    if (id) {
      const service = await prisma.service.findUnique({ where: { id } });
      if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(service);
    }

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { shortDescription: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.service.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.service.count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST - Create a new service
export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const data = await request.json();

    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = slugify(data.title);
    } else {
      data.slug = slugify(data.slug);
    }

    const service = await prisma.service.create({ data });
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

// PUT - Update a service
export async function PUT(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Sanitize slug if provided
    if (updateData.slug) {
      updateData.slug = slugify(updateData.slug);
    }

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE - Delete a service
export async function DELETE(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
