import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const madmobFont = localFont({
  src: "../public/fonts/madmob.otf",
  variable: "--font-madmob",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collective",
  description: "Artistic Collective Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={madmobFont.variable}>
      <body>{children}</body>
    </html>
  );
}
