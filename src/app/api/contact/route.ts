import { NextRequest, NextResponse } from "next/server";
import { appendContact, ContactSubmission } from "@/lib/contacts";
import { appendEvent } from "@/lib/analytics";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const submission: ContactSubmission = {
      id: randomUUID(),
      name: body.name ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      reason: body.reason ?? "Other",
      message: body.message ?? "",
      status: "new",
      createdAt: new Date().toISOString(),
    };
    const saved = appendContact(submission);

    // Track as analytics event (best-effort, never blocks the response)
    appendEvent({
      id: randomUUID(),
      type: "form_submit",
      page: "/contact",
      label: `Contact Form: ${submission.reason}`,
      ts: submission.createdAt,
    });

    if (!saved) {
      // Storage isn't writable in this environment — do not tell the visitor
      // their message was sent when it wasn't; a lost lead is a real cost.
      return NextResponse.json(
        { error: "We couldn't save your message right now. Please email help@zypp.app or WhatsApp us instead." },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, id: submission.id });
  } catch {
    return NextResponse.json(
      { error: "We couldn't save your message right now. Please email help@zypp.app or WhatsApp us instead." },
      { status: 500 }
    );
  }
}
