import { NextResponse } from 'next/server';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';

export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'articles';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, AVIF' },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    const validTypes = ['articles', 'services', 'team'];
    const folderType = validTypes.includes(type) ? type : 'articles';

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50);
    const filename = `${folderType}/${safeName}-${timestamp}.${ext}`;

    // --- Local dev: save to public/uploads/ ---
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      const { writeFile, mkdir } = await import('fs/promises');
      const { join } = await import('path');
      const dir = join(process.cwd(), 'public', 'uploads', folderType);
      await mkdir(dir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      const localFilename = `${safeName}-${timestamp}.${ext}`;
      await writeFile(join(dir, localFilename), buffer);
      const url = `/uploads/${folderType}/${localFilename}`;
      return NextResponse.json({ url, filename });
    }

    // --- Production: Vercel Blob ---
    const { put } = await import('@vercel/blob');
    const blob = await put(filename, file, { access: 'public' });
    return NextResponse.json({ url: blob.url, filename: blob.pathname });

  } catch (error) {
    console.error('Error uploading file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      error: 'Failed to upload file',
      details: errorMessage,
    }, { status: 500 });
  }
}
