import { NextRequest, NextResponse } from "next/server";
import { appendEvent, AnalyticsEvent } from "@/lib/analytics";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<AnalyticsEvent>;
    const event: AnalyticsEvent = {
      id: randomUUID(),
      type: body.type ?? "page_view",
      page: body.page ?? "/",
      label: body.label,
      target: body.target,
      referrer: req.headers.get("referer") ?? body.referrer,
      userAgent: req.headers.get("user-agent") ?? undefined,
      sessionId: body.sessionId,
      ts: new Date().toISOString(),
    };
    appendEvent(event);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }
}
