import { NextRequest, NextResponse } from "next/server";
import { readCMS, writeCMS, DynamicPage, DEFAULT_NAV_SETTINGS } from "@/lib/cms";
import { randomUUID } from "crypto";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === (process.env.ADMIN_PASSWORD ?? "zypp2026");
}

// GET all dynamic pages
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readCMS().dynamicPages);
}

// POST create new dynamic page
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as Partial<DynamicPage>;
  const config = readCMS();
  const now = new Date().toISOString();
  const newPage: DynamicPage = {
    id: randomUUID(),
    slug: body.slug ?? "new-page",
    title: body.title ?? "Untitled Page",
    metaDescription: body.metaDescription ?? "",
    published: false,
    createdAt: now,
    updatedAt: now,
    sections: body.sections ?? [],
    navSettings: body.navSettings ?? { ...DEFAULT_NAV_SETTINGS },
  };
  config.dynamicPages.push(newPage);
  writeCMS(config);
  return NextResponse.json({ success: true, page: newPage });
}
