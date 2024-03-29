import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { Providers } from "./providers";

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
  return (
    <html lang="en" className="dark">
      <body className={font.className}>
        <Providers>
          <main className="min-h-screen flex-col items-center justify-between px-6 sm:px-12 md:px-24 lg:px-0 lg:max-w-4xl mx-auto">
            <Navigation />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
