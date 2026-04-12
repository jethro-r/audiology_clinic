import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';

// GET - List articles with pagination and search
export async function GET(request: NextRequest) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10')));
    const search = searchParams.get('search')?.trim() || '';

    const id = searchParams.get('id');
    if (id) {
      const article = await prisma.article.findUnique({ where: { id } });
      if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(article);
    }

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { excerpt: { contains: search, mode: 'insensitive' as const } },
            { categories: { hasSome: [search] } },
            { author: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

// POST - Create a new article
export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const data = await request.json();

    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Set publishedAt if publishing
    if (data.published && !data.publishedAt) {
      data.publishedAt = new Date().toISOString();
    }

    const article = await prisma.article.create({ data });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

// PUT - Update an article
export async function PUT(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Set publishedAt when first published
    if (updateData.published && !updateData.publishedAt) {
      const existing = await prisma.article.findUnique({ where: { id } });
      if (!existing?.publishedAt) {
        updateData.publishedAt = new Date().toISOString();
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// DELETE - Delete an article
export async function DELETE(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
