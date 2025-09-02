import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MEDIA_EMAIL_DEFAULT =
  process.env.MEDIA_EMAIL_TO || "jacob@imogenheap.com";
const MEDIA_FROM_EMAIL =
  process.env.MEDIA_EMAIL_FROM || "onboarding@resend.dev";

function buildEmailHtml(form: Record<string, string>): string {
  const get = (k: string) => (form[k] ? form[k] : "—");

  return `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6;">
      <h2 style="margin:0 0 12px;">New Interview Request</h2>
      <h3 style="margin:16px 0 6px;">Point of Contact</h3>
      <ul>
        <li><strong>Name:</strong> ${get("contactName")}</li>
        <li><strong>Phone Number:</strong> ${get("contactPhone")}</li>
        <li><strong>Email Address:</strong> ${get("contactEmail")}</li>
        <li><strong>Country:</strong> ${get("country")}</li>
      </ul>
      <h3 style="margin:16px 0 6px;">Company Information</h3>
      <ul>
        <li><strong>Company/Publication:</strong> ${get("companyName")}</li>
        <li><strong>Website:</strong> ${get("website")}</li>
        <li><strong>Social Handles:</strong> ${get("socialHandles")}</li>
        <li><strong>Listenership Figures:</strong> ${get("listenership")}</li>
        <li><strong>Target Audience:</strong> ${get("targetAudience")}</li>
      </ul>
      <h3 style="margin:16px 0 6px;">Request Details</h3>
      <ul>
        <li><strong>Interview Location:</strong> ${get("locationType")}</li>
        <li><strong>Requested Times/Dates:</strong> ${get(
          "requestedTimes",
        )}</li>
        <li><strong>Recording Type:</strong> ${get("recordingType")}</li>
        <li><strong>Remote Platforms:</strong> ${get("remotePlatforms")}</li>
        <li><strong>Intended Length:</strong> ${get("intendedLength")}</li>
        <li><strong>Social Media Content:</strong> ${get(
          "socialMediaCreated",
        )}</li>
        <li><strong>Subject Matter:</strong> ${get("subjectMatter")}</li>
        <li><strong>Allow Transcript for AI (Mogen):</strong> ${get(
          "allowTranscriptForAI",
        )}</li>
      </ul>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());
    const form: Record<string, string> = Object.keys(formEntries).reduce(
      (acc, key) => {
        const value = formEntries[key];
        acc[key] = typeof value === "string" ? value : String(value);
        return acc;
      },
      {} as Record<string, string>,
    );

    const requiredKeys = [
      "contactName",
      "contactEmail",
      "country",
      "companyName",
      "locationType",
      "recordingType",
      "socialMediaCreated",
      "allowTranscriptForAI",
    ];
    for (const key of requiredKeys) {
      if (!form[key] || !String(form[key]).trim()) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${key}` },
          { status: 400 },
        );
      }
    }

    const toEmail = MEDIA_EMAIL_DEFAULT;
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set.");
      return NextResponse.json(
        { success: false, error: "Email service not configured." },
        { status: 500 },
      );
    }
    const resend = new Resend(resendApiKey);
    const subject = `Interview Request: ${
      form.companyName || "Unknown Company"
    } (${form.contactName || "Unknown"})`;
    const replyTo = form.contactEmail || undefined;
    const html = buildEmailHtml(form);

    await resend.emails.send({
      from: `ImogenHeap Site <${MEDIA_FROM_EMAIL}>`,
      to: [toEmail],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media request submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
