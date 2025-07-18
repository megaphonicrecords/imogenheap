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
  other: {
    "font-preload": "/fonts/immi.ttf",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen justify-center items-center light">
      <body className={font.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
      <GoogleAnalytics gaId="G-GKM5QWJG2G" />
      <Analytics />
    </html>
  );
}
