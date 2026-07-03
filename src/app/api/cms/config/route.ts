import { NextRequest, NextResponse } from "next/server";
import { readCMS, writeCMS } from "@/lib/cms";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  const password = process.env.ADMIN_PASSWORD ?? "zypp2026";
  return token === password;
}

// Public GET — used by AnnouncementBar on the client
export async function GET() {
  return NextResponse.json(readCMS());
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const current = readCMS();
  const updated = { ...current, ...body };
  writeCMS(updated);
  return NextResponse.json({ success: true, data: updated });
}

