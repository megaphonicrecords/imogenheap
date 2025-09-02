"use client";

import MediaRequestForm from "../components/MediaRequestForm";

export default function MediaRequestPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-semibold">Interview Request Form</h1>
      <p className="mb-8 text-sm text-gray-600">
        All media requests should be submitted via this form. US-based requests
        will be automatically routed to the US press contact.
      </p>
      <MediaRequestForm />
    </div>
  );
}
