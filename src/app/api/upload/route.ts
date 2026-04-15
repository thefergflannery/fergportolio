import { NextRequest, NextResponse } from "next/server";

const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png":  ".png",
  "image/gif":  ".gif",
  "image/webp": ".webp",
};

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

  if (!ALLOWED_MIME[file.type]) {
    return NextResponse.json(
      { error: "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed." },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 8 MB." },
      { status: 400 }
    );
  }

  // Sanitise filename
  const safeName = file.name
    .replace(/.*[\\/]/, "")               // strip directory components
    .replace(/[^a-zA-Z0-9._-]/g, "_");   // collapse special chars

  if (!safeName || safeName.startsWith(".")) {
    return NextResponse.json({ error: "Invalid filename." }, { status: 400 });
  }

  const token  = process.env.GITHUB_TOKEN;
  const repo   = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN and GITHUB_REPO env vars are required." },
      { status: 503 }
    );
  }

  const filePath = `public/images/${safeName}`;
  const apiUrl   = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers  = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };

  // Get existing file SHA if it exists (needed for updates)
  let sha: string | undefined;
  const shaRes = await fetch(`${apiUrl}?ref=${branch}`, { headers });
  if (shaRes.ok) {
    const existing = await shaRes.json();
    sha = existing.sha;
  }

  // Convert file to base64
  const bytes      = await file.arrayBuffer();
  const base64     = Buffer.from(bytes).toString("base64");

  const body = JSON.stringify({
    message: `chore: upload image ${safeName} via admin`,
    content: base64,
    branch,
    ...(sha ? { sha } : {}),
  });

  const putRes = await fetch(apiUrl, { method: "PUT", headers, body });
  if (!putRes.ok) {
    const err = await putRes.text();
    return NextResponse.json({ error: `GitHub upload failed: ${err}` }, { status: 500 });
  }

  return NextResponse.json({ path: `/images/${safeName}` });
}