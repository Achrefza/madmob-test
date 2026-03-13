import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import MadBotWidget from "@/components/MadBotWidget";

const madmobFont = localFont({
  src: "fonts/madmob.otf",
  variable: "--font-madmob",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madmob",
  description: "Artistic Collective Website",
  icons: {
    icon: "/images/backgrounds/madmob.png",
    shortcut: "/images/backgrounds/madmob.png",
    apple: "/images/backgrounds/madmob.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={madmobFont.variable}>
      <body>
        <img
          src="/images/backgrounds/madmob.png"
          alt="Madmob logo"
          className="fixed top-5 right-6 z-50 w-14 h-auto opacity-90 pointer-events-none select-none"
        />
        {children}
        <MadBotWidget />
      </body>
    </html>
  );
}
