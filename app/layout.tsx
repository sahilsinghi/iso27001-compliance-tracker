import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AssessmentProvider } from "@/lib/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISO 27001 Self-Check — Annex A Compliance Tracker",
  description: "Track your ISO 27001:2022 compliance posture across all 93 Annex A controls. Privacy-first, no server-side data.",
  openGraph: {
    title: "ISO 27001 Self-Check",
    description: "ISO 27001:2022 Annex A compliance tracker — 93 controls, evidence management, Stage-1 audit readiness.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AssessmentProvider>{children}</AssessmentProvider>
      </body>
    </html>
  );
}
