import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

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
    <html lang="en" className="min-h-screen justify-center items-center light">
      <body className={font.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      <Analytics />
    </html>
  );
}
