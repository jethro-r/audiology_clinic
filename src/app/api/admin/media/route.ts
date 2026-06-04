import { NextResponse } from 'next/server';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { readdir, stat, unlink } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    // Production: list from Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { list } = await import('@vercel/blob');
      const blobs = await list({ prefix: 'media/' });

      const images = blobs.blobs.map((blob) => ({
        url: blob.url,
        filename: blob.pathname.replace('media/', ''),
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      }));

      images.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      return NextResponse.json(images);
    }

    // Local dev: read from filesystem
    const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
    const publicDir = join(process.cwd(), 'public');
    const dirs = ['images', 'uploads/media', 'uploads/articles', 'uploads/services', 'uploads/team'];

    const images: { url: string; filename: string; size: number; uploadedAt: string }[] = [];

    for (const dir of dirs) {
      const fullDir = join(publicDir, dir);
      let files: string[];
      try {
        files = await readdir(fullDir);
      } catch {
        continue;
      }

      const dirImages = await Promise.all(
        files
          .filter((f) => imageExts.some((ext) => f.toLowerCase().endsWith(ext)))
          .map(async (f) => {
            const filePath = join(fullDir, f);
            const fileStat = await stat(filePath);
            return {
              url: `/${dir}/${f}`,
              filename: f,
              size: fileStat.size,
              uploadedAt: fileStat.mtime.toISOString(),
            };
          })
      );
      images.push(...dirImages);
    }

    images.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error listing media:', error);
    return NextResponse.json({ error: 'Failed to list media' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const { url } = await request.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Production: delete from Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { del } = await import('@vercel/blob');
      await del(url);
      return NextResponse.json({ success: true });
    }

    // Local dev: delete from filesystem
    if (!url.startsWith('/frontend/') && !url.startsWith('/uploads/')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const filePath = join(process.cwd(), 'public', url);
    await unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
