import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readCMS, writeCMS } from "@/lib/cms";
import { resolveContent, getPageDef } from "@/lib/content";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === (process.env.ADMIN_PASSWORD ?? "zypp2026");
}

// GET ?slug=home — merged content (defaults + stored overrides) for the editor.
// GET (no slug) — the full raw pageContent map.
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = req.nextUrl.searchParams.get("slug");
  const cms = readCMS();
  if (slug) {
    return NextResponse.json(resolveContent(slug, cms.pageContent?.[slug]));
  }
  return NextResponse.json(cms.pageContent ?? {});
}

// PATCH { slug, content } — persist overrides for a single page.
export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as { slug?: string; content?: Record<string, unknown> };
  if (!body.slug || typeof body.content !== "object" || body.content === null) {
    return NextResponse.json({ error: "slug and content are required" }, { status: 400 });
  }
  const cms = readCMS();
  cms.pageContent = { ...cms.pageContent, [body.slug]: body.content as Record<string, Record<string, unknown>> };
  writeCMS(cms);

  // Push the edit live instantly (invalidate the prerendered page).
  const def = getPageDef(body.slug);
  if (def) {
    try { revalidatePath(def.path); } catch { /* noop outside request scope */ }
  }
  return NextResponse.json({ success: true });
}
