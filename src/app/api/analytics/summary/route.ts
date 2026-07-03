import { NextRequest, NextResponse } from "next/server";
import { readRange, aggregate } from "@/lib/analytics";

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "zypp2026");
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") ?? "7"; // days
  const days = Math.min(parseInt(range, 10) || 7, 90);

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - (days - 1));

  const events = readRange(
    start.toISOString().slice(0, 10),
    end.toISOString().slice(0, 10)
  );

  return NextResponse.json(aggregate(events));
}
