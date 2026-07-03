import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readCMS, writeCMS, DynamicPage } from "@/lib/cms";

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "zypp2026");
}

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const config = readCMS();
  const page = config.dynamicPages.find((p) => p.slug === slug);
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(page);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  const body = await req.json() as Partial<DynamicPage>;
  const config = readCMS();
  const idx = config.dynamicPages.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  config.dynamicPages[idx] = { ...config.dynamicPages[idx], ...body, updatedAt: new Date().toISOString() };
  writeCMS(config);
  try { revalidatePath(`/${slug}`); } catch { /* noop */ }
  return NextResponse.json({ success: true, page: config.dynamicPages[idx] });
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  const config = readCMS();
  config.dynamicPages = config.dynamicPages.filter((p) => p.slug !== slug);
  writeCMS(config);
  try { revalidatePath(`/${slug}`); } catch { /* noop */ }
  return NextResponse.json({ success: true });
}

