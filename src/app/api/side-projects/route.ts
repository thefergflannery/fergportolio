import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "src/data/side-projects.json");

export async function GET() {
  const raw = readFileSync(DATA_FILE, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(req: NextRequest) {
  const sideProjects = await req.json();
  const content = JSON.stringify(sideProjects, null, 2);

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const filePath = "src/data/side-projects.json";

  if (!token || !repo) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN and GITHUB_REPO env vars are required." },
      { status: 503 }
    );
  }

  const apiBase = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };

  const shaRes = await fetch(`${apiBase}?ref=${branch}`, { headers });
  if (!shaRes.ok) {
    const err = await shaRes.text();
    return NextResponse.json({ error: `GitHub GET failed: ${err}` }, { status: 500 });
  }
  const { sha } = await shaRes.json();

  const body = JSON.stringify({
    message: "chore: update side projects via admin",
    content: Buffer.from(content).toString("base64"),
    sha,
    branch,
  });

  const putRes = await fetch(apiBase, { method: "PUT", headers, body });
  if (!putRes.ok) {
    const err = await putRes.text();
    return NextResponse.json({ error: `GitHub PUT failed: ${err}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
