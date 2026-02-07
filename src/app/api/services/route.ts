import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const homepage = searchParams.get('homepage') === 'true';
    const footer = searchParams.get('footer') === 'true';

    const where: any = {};
    if (homepage) where.showOnHomepage = true;
    if (footer) where.showInFooter = true;

    const services = await prisma.service.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
