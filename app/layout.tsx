import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Patient Flow";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} - SMS & Email Sequences`,
  description: "Craft personalized SMS and email sequences for your CRM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${dmSerif.variable} ${spaceMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
