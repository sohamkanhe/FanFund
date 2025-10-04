import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  // Convert the file to a buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate a unique filename to prevent overwriting
  const filename = `${Date.now()}-${file.name}`;

  // Define the directory where files will be stored
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadDir, filename);

  try {
    // Ensure the upload directory exists. Create it if it doesn't.
    await mkdir(uploadDir, { recursive: true });

    // Write the file to the specified path
    await writeFile(filePath, buffer);

    // Return the public path to be stored in the database
    const publicPath = `/uploads/${filename}`;
    return NextResponse.json({ filePath: publicPath });

  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "Failed to save file." }, { status: 500 });
  }
}
