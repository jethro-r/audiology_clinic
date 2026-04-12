import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { slugify } from '@/lib/utils';

// GET - List articles with pagination and search
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
      const article = await prisma.article.findUnique({ where: { id } });
      if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(article);
    }

    let items;
    let resolvedTotal: number;

    if (search) {
      const normalizedSearch = search.toLowerCase();
      const all = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } });
      const filtered = all.filter(
        (a) =>
          a.title?.toLowerCase().includes(normalizedSearch) ||
          a.excerpt?.toLowerCase().includes(normalizedSearch) ||
          a.author?.toLowerCase().includes(normalizedSearch) ||
          a.categories.some((c) => c.toLowerCase().includes(normalizedSearch))
      );
      resolvedTotal = filtered.length;
      items = filtered.slice((page - 1) * limit, page * limit);
    } else {
      const [rows, count] = await Promise.all([
        prisma.article.findMany({
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.article.count(),
      ]);
      items = rows;
      resolvedTotal = count;
    }

    return NextResponse.json({
      items,
      total: resolvedTotal,
      page,
      limit,
      totalPages: Math.ceil(resolvedTotal / limit),
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
      data.slug = slugify(data.title);
    } else {
      data.slug = slugify(data.slug);
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

    // Sanitize slug if provided
    if (updateData.slug) {
      updateData.slug = slugify(updateData.slug);
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
