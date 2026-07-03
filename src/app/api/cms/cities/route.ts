import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readCMS, writeCMS, type City } from "@/lib/cms";

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "zypp2026");
}

// Public — the website reads the live city/hub list.
export async function GET() {
  return NextResponse.json(readCMS().cities);
}

// Admin — replace the full cities array.
export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as { cities?: City[] };
  if (!Array.isArray(body.cities)) {
    return NextResponse.json({ error: "cities array required" }, { status: 400 });
  }
  const cms = readCMS();
  cms.cities = body.cities;
  writeCMS(cms);
  // Reflect changes live on the pages that render cities.
  try {
    revalidatePath("/find-hub");
    revalidatePath("/");
    revalidatePath("/advertising");
  } catch { /* noop */ }
  return NextResponse.json({ success: true });
}
