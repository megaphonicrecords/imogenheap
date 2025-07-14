"use client";

import { Button, Input, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Load Brevo script
    const script = document.createElement("script");
    script.src = "https://sibforms.com/forms/end-form/build/main.js";
    script.defer = true;
    document.body.appendChild(script);

    // Set up global variables for Brevo
    (window as any).REQUIRED_CODE_ERROR_MESSAGE =
      "Please choose a country code";
    (window as any).LOCALE = "en";
    (window as any).EMAIL_INVALID_MESSAGE = (
      window as any
    ).SMS_INVALID_MESSAGE =
      "The information provided is invalid. Please review the field format and try again.";
    (window as any).REQUIRED_ERROR_MESSAGE =
      "This field cannot be left blank. ";
    (window as any).GENERIC_INVALID_MESSAGE =
      "The information provided is invalid. Please review the field format and try again.";
    (window as any).translation = {
      common: {
        selectedList: "{quantity} list selected",
        selectedLists: "{quantity} lists selected",
        selectedOption: "{quantity} selected",
        selectedOptions: "{quantity} selected",
      },
    };
    (window as any).AUTOHIDE = Boolean(0);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    setShowSuccess(false);

    // Validate email field is not empty
    if (!email.trim()) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("EMAIL", email);
      formData.append("email_address_check", "");
      formData.append("locale", "en");

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setEmail("");
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Brevo Form Styles */}
      <style jsx>{`
        @font-face {
          font-display: block;
          font-family: Roboto;
          src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2)
              format("woff2"),
            url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff)
              format("woff");
        }

        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 600;
          src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2)
              format("woff2"),
            url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff)
              format("woff");
        }

        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 700;
          src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2)
              format("woff2"),
            url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff)
              format("woff");
        }

        #sib-container input:-ms-input-placeholder {
          text-align: left;
          font-family: Helvetica, sans-serif;
          color: #c0ccda;
        }

        #sib-container input::placeholder {
          text-align: left;
          font-family: Helvetica, sans-serif;
          color: #c0ccda;
        }

        #sib-container a {
          text-decoration: underline;
          color: #2bb2fc;
        }

        .sib-form-message-panel {
          font-size: 16px;
          text-align: left;
          font-family: Helvetica, sans-serif;
          border-radius: 8px;
          max-width: 540px;
          margin: 0 auto 16px;
          padding: 12px;
          display: none;
        }

        .sib-form-message-panel.show {
          display: block;
        }

        .sib-form-message-panel.error {
          color: #661d1d;
          background-color: #ffeded;
          border: 1px solid #ff4949;
        }

        .sib-form-message-panel.success {
          color: #085229;
          background-color: #e7faf0;
          border: 1px solid #13ce66;
        }

        .sib-icon {
          width: 20px;
          height: 20px;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
        }

        .sib-form-message-panel__text {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div>
        <Card className="bg-zinc-800 lg:max-w-4xl lg:w-full text-center rounded-xl border px-5 py-4 transition-colors border-dotted border-zinc-700">
          <CardHeader className="pb-2 text-sm justify-center">
            <div>
              <h2>Celebrate with me…</h2>
              <p className="font-extralight my-4 text-balance">
                This week marks 20 years since something that truly changed my
                life, and maybe yours too. I’d love for you to join me this
                Friday at 18:00 UK.
              </p>
              <p className="font-extralight mb-4 text-balance">
                I’ll be streaming across all the usual places, but the proper
                party will be happening right here. If you&apos;re one of the
                lovely humans already on the Imogen Heap app, you’ll get special
                access 🌟 And if not, there’s still time to{" "}
                <a
                  href="https://imogenheap.app"
                  rel="noopener noreferrer"
                  className="text-foreground hover:font-normal dotLink cursor-pointer"
                >
                  join us
                </a>
                .
              </p>
              <p className="font-extralight text-balance">
                Whether you’ve been with me since the beginning or only just
                stumbled in, thank you for being part of this journey. See you
                Friday? Big love,{" "}
              </p>
              <p className="mt-4">
                <span style={{ fontFamily: "Immi, sans-serif" }}>
                  Xx Imogen
                </span>
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-2">
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
              <Input
                type="email"
                id="EMAIL"
                name="EMAIL"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                labelPlacement="outside"
                variant="bordered"
                classNames={{
                  input: "text-white",
                  inputWrapper:
                    "border-zinc-600 hover:border-zinc-500 focus-within:border-pink-400 max-w-md mx-auto",
                  label: "text-zinc-300 font-medium",
                }}
                required
                data-required="true"
                autoComplete="off"
              />
              <Button
                type="submit"
                color="secondary"
                variant="flat"
                isLoading={isLoading}
                className="mx-auto"
              >
                {isLoading ? "SUBSCRIBING..." : "SUBSCRIBE TO NEWSLETTER"}
              </Button>
              {/* Hidden Brevo fields */}
              <input
                type="text"
                name="email_address_check"
                value=""
                className="hidden"
              />
              <input type="hidden" name="locale" value="en" />
            </form>
            {showError && (
              <div className="w-full text-center text-sm mt-2 text-[#FF00A4]">
                <span>
                  Your subscription could not be saved. Please try again.
                </span>
              </div>
            )}
            {showSuccess && (
              <div className="w-full text-center text-sm mt-2 text-[#D0E321]">
                <span>Your subscription has been successful.</span>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
