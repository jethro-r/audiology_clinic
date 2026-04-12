import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';

// GET - List team members with pagination and search
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
      const member = await prisma.teamMember.findUnique({ where: { id } });
      if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(member);
    }

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { title: { contains: search, mode: 'insensitive' as const } },
            { credentials: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.teamMember.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.teamMember.count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

// POST - Create a new team member
export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const data = await request.json();

    // Generate slug from name if not provided
    if (!data.slug) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const member = await prisma.teamMember.create({ data });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

// PUT - Update a team member
export async function PUT(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(member);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

// DELETE - Delete a team member
export async function DELETE(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
