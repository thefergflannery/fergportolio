import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/gif"];
const ALLOWED_EXT = /\.(jpe?g|png|gif)$/i;
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  // Validate MIME type
  if (!ALLOWED_MIME.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Only JPG, PNG, and GIF are allowed." },
      { status: 400 }
    );
  }

  // Validate extension (double-check against filename)
  if (!ALLOWED_EXT.test(file.name)) {
    return NextResponse.json(
      { error: "Invalid file extension. Only .jpg, .png, .gif allowed." },
      { status: 400 }
    );
  }

  // Validate size
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 8 MB." },
      { status: 400 }
    );
  }

  // Sanitise filename — strip path traversal, collapse special chars
  const safeName = file.name
    .replace(/.*[\\/]/, "") // strip directory components
    .replace(/[^a-zA-Z0-9._-]/g, "_");

  if (!safeName || safeName.startsWith(".")) {
    return NextResponse.json({ error: "Invalid filename." }, { status: 400 });
  }

  const dest = join(process.cwd(), "public", "images", safeName);

  const bytes = await file.arrayBuffer();
  writeFileSync(dest, Buffer.from(bytes));

  return NextResponse.json({ path: `/images/${safeName}` });
}