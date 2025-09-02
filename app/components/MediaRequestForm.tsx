"use client";

import { useState } from "react";
import Input from "./ui/input";
import Textarea from "./ui/textarea";
import Select from "./ui/select";
import Button from "./ui/button";
import Label from "./ui/label";

type SubmitState = "idle" | "submitting" | "success" | "error";

type MediaFormState = {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  country: string;
  companyName: string;
  website: string;
  socialHandles: string;
  listenership: string;
  targetAudience: string;
  locationType: "in_person" | "remote" | "";
  requestedTimes: string;
  recordingType: "talk_only" | "audio_only" | "video_and_audio" | "";
  remotePlatforms: string;
  intendedLength: string;
  socialMediaCreated: "yes" | "no" | "";
  subjectMatter: string;
  allowTranscriptForAI: "yes" | "no" | "";
};

const initialState: MediaFormState = {
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  country: "",
  companyName: "",
  website: "",
  socialHandles: "",
  listenership: "",
  targetAudience: "",
  locationType: "",
  requestedTimes: "",
  recordingType: "",
  remotePlatforms: "",
  intendedLength: "",
  socialMediaCreated: "",
  subjectMatter: "",
  allowTranscriptForAI: "",
};

export default function MediaRequestForm({
  onSubmitted,
}: {
  onSubmitted?: () => void;
}) {
  const [form, setForm] = useState<MediaFormState>(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function update<K extends keyof MediaFormState>(
    key: K,
    value: MediaFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState("submitting");
    setErrorMessage(null);

    try {
      const data = new FormData();
      (Object.keys(form) as Array<keyof MediaFormState>).forEach((key) => {
        const value = form[key];
        data.append(String(key), value == null ? "" : String(value));
      });

      const response = await fetch("/api/media-request", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        setErrorMessage(
          json?.error ||
            "There was an error submitting your request. Please try again.",
        );
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setForm(initialState);
      onSubmitted?.();
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
      setSubmitState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-sm font-bold">Point of Contact Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="contactName">Name</Label>
            <Input
              id="contactName"
              name="contactName"
              required
              value={form.contactName}
              onChange={(e) => update("contactName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone number</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              value={form.contactPhone}
              onChange={(e) => update("contactPhone", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contactEmail">Email address</Label>
            <Input
              id="contactEmail"
              type="email"
              name="contactEmail"
              required
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              required
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold">Company Information</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="companyName">Company/publication name</Label>
            <Input
              id="companyName"
              name="companyName"
              required
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              name="website"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="socialHandles">Social handles</Label>
            <Input
              id="socialHandles"
              name="socialHandles"
              value={form.socialHandles}
              onChange={(e) => update("socialHandles", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="listenership">Listenership figures</Label>
            <Input
              id="listenership"
              name="listenership"
              value={form.listenership}
              onChange={(e) => update("listenership", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="targetAudience">
              Target audience age range and brief description
            </Label>
            <Textarea
              id="targetAudience"
              name="targetAudience"
              rows={3}
              value={form.targetAudience}
              onChange={(e) => update("targetAudience", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold">Request Details</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="locationType">
              Where will this interview take place?
            </Label>
            <Select
              id="locationType"
              name="locationType"
              required
              value={form.locationType}
              onChange={(e) =>
                update(
                  "locationType",
                  e.target.value as MediaFormState["locationType"],
                )
              }
            >
              <option value="">Select one</option>
              <option value="in_person">In Person</option>
              <option value="remote">Remotely</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="requestedTimes">
              Please list times and dates you are requesting if specific for
              your deadline
            </Label>
            <Textarea
              id="requestedTimes"
              name="requestedTimes"
              rows={3}
              value={form.requestedTimes}
              onChange={(e) => update("requestedTimes", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="recordingType">
              How will the interview be recorded?
            </Label>
            <Select
              id="recordingType"
              name="recordingType"
              required
              value={form.recordingType}
              onChange={(e) =>
                update(
                  "recordingType",
                  e.target.value as MediaFormState["recordingType"],
                )
              }
            >
              <option value="">Select one</option>
              <option value="talk_only">
                Talk interview only (Print, Quotes, etc.)
              </option>
              <option value="audio_only">
                Recorded audio only (Podcasts, Radio, etc.)
              </option>
              <option value="video_and_audio">
                Both recorded video and audio (YouTube, etc.)
              </option>
            </Select>
          </div>
          <div>
            <Label htmlFor="remotePlatforms">
              What platforms will be used for recording if done remotely? (Zoom,
              Google Meet, other)
            </Label>
            <Input
              id="remotePlatforms"
              name="remotePlatforms"
              value={form.remotePlatforms}
              onChange={(e) => update("remotePlatforms", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="intendedLength">
              What is the intended length of the interview?
            </Label>
            <Input
              id="intendedLength"
              name="intendedLength"
              value={form.intendedLength}
              onChange={(e) => update("intendedLength", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="socialMediaCreated">
              Will social media content be created from the interview?
            </Label>
            <Select
              id="socialMediaCreated"
              name="socialMediaCreated"
              required
              value={form.socialMediaCreated}
              onChange={(e) =>
                update(
                  "socialMediaCreated",
                  e.target.value as MediaFormState["socialMediaCreated"],
                )
              }
            >
              <option value="">Select one</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
            <p className="mt-1 text-xs text-gray-600">
              Please note: all social media will need to be pre-approved before
              public release and the use of Imogen&apos;s social media for
              promotion of the interview is not guaranteed.
            </p>
          </div>
          <div>
            <Label htmlFor="subjectMatter">
              What is the intended subject matter or topic of the interview?
            </Label>
            <Textarea
              id="subjectMatter"
              name="subjectMatter"
              rows={4}
              value={form.subjectMatter}
              onChange={(e) => update("subjectMatter", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="allowTranscriptForAI">
              Can the transcript from the interview be made available for the
              training of Imogen&apos;s personal AI, Mogen?
            </Label>
            <Select
              id="allowTranscriptForAI"
              name="allowTranscriptForAI"
              required
              value={form.allowTranscriptForAI}
              onChange={(e) =>
                update(
                  "allowTranscriptForAI",
                  e.target.value as MediaFormState["allowTranscriptForAI"],
                )
              }
            >
              <option value="">Select one</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4 pt-2">
        <Button
          type="submit"
          className="rounded-xl transition-all duration-300"
          variant="flat"
          disabled={submitState === "submitting"}
        >
          {submitState === "submitting" ? "Submitting..." : "Submit Request"}
        </Button>
        {submitState === "success" && (
          <p className="text-sm text-green-600">
            Thank you. Your request has been submitted.
          </p>
        )}
        {submitState === "error" && errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
