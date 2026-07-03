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
    appendContact(submission);

    // Track as analytics event
    appendEvent({
      id: randomUUID(),
      type: "form_submit",
      page: "/contact",
      label: `Contact Form: ${submission.reason}`,
      ts: submission.createdAt,
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch {
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }
}
