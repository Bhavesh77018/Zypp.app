import { NextRequest, NextResponse } from "next/server";
import { readContacts, updateContactStatus } from "@/lib/contacts";

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "zypp2026");
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readContacts());
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  updateContactStatus(id, status);
  return NextResponse.json({ success: true });
}
