"use client";

import MediaRequestForm from "../components/MediaRequestForm";

export default function MediaRequestPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-semibold">Interview Request Form</h1>
      <p className="mb-8 text-sm text-gray-600">
        All worldwide media requests should be submitted via this form. For US press, please email
        {" "}
        <a className="underline decoration-dotted underline-offset-4" href="mailto:sarah.avrin@charmschoolmedia.com">sarah.avrin@charmschoolmedia.com</a>.
      </p>
      <MediaRequestForm />
    </div>
  );
}
