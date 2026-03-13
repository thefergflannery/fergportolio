import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "src/data/projects.json");

export async function GET() {
  const raw = readFileSync(DATA_FILE, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(req: NextRequest) {
  const projects = await req.json();
  writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}
