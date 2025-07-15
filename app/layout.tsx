import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

const font = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imogen Heap",
  description: "Imogen Heap official website and portal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className="flex min-h-screen justify-center items-center dark"
    >
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={font.className}>
        <Providers>
          <main className="flex-col items-center justify-between px-6 sm:px-12 md:px-24 lg:px-0 lg:max-w-4xl mx-auto">
            <Navigation />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
      <Analytics />
    </html>
  );
}
