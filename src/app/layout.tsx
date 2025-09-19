import type { Metadata } from "next";
import { Geist, Quicksand } from "next/font/google";
import "./globals.css";

const instrumentSans = Quicksand({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Math Modules",
  description: "Get modules at your finger tips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSans.className}>
      <body>{children}</body>
    </html>
  );
}
