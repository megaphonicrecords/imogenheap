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

    try {
      const formData = new FormData();
      formData.append("EMAIL", email);
      formData.append("email_address_check", "");
      formData.append("locale", "en");

      const response = await fetch(
        "https://f7d6e1ff.sibforms.com/serve/MUIFAHPD2BAccwnpN1kWQTSaNjOC6H4laKDmSnI68HIM6PHBz7vexM__cJvE6dEYwkm9ytlkwMPgUaPujqvkSDrQeSiz-VzThaZpLyn9EfBvGIkURbnd6PVIOMvSU1E3YRRA222gsT5SCu80op_2m0QGymPamxL7-2IulBTKUf_9q7MozlTToKY9x0RyTzIr9ub8DIWNOEzq8Q4s",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
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
          src:
            url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2)
              format("woff2"),
            url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff)
              format("woff");
        }

        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 600;
          src:
            url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2)
              format("woff2"),
            url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff)
              format("woff");
        }

        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 700;
          src:
            url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2)
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
        {showError && (
          <div className="sib-form-message-panel error show">
            <div className="sib-form-message-panel__text">
              <svg viewBox="0 0 512 512" className="sib-icon">
                <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
              </svg>
              <span>
                Your subscription could not be saved. Please try again.
              </span>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="sib-form-message-panel success show">
            <div className="sib-form-message-panel__text">
              <svg viewBox="0 0 512 512" className="sib-icon">
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
              </svg>
              <span>Your subscription has been successful.</span>
            </div>
          </div>
        )}

        <Card className="bg-zinc-800 lg:max-w-4xl lg:w-full text-center rounded-xl border px-5 py-4 transition-colors border-dotted border-zinc-700">
          <CardHeader className="pb-2 text-sm justify-center">
            Celebrate with me…
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
          </CardBody>
        </Card>
      </div>
    </>
  );
}
