import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === (process.env.ADMIN_PASSWORD ?? "zypp2026");
}

const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"]);
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 413 });
  }

  const ext = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "") : "png";
  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");

  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(dir, filename), bytes);
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (e) {
    // Serverless platforms (Vercel etc.) ship a read-only filesystem, and
    // public/ is served from the immutable deployment bundle anyway — a
    // written file wouldn't survive the next deploy even if this succeeded.
    console.error("[upload] write failed — filesystem likely read-only in this environment:", e);
    return NextResponse.json(
      { error: "Image uploads aren't supported in this environment yet. Paste an image URL instead." },
      { status: 503 }
    );
  }
}
