import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import DelayedMadBotWidget from "@/app/DelayedMadBotWidget";

const madmobFont = localFont({
  src: "fonts/madmob.otf",
  variable: "--font-madmob",
  display: "swap",
});

const textFont = localFont({
  src: "fonts/text.ttf",
  variable: "--font-text",
  display: "swap",
});

const buttonsFont = localFont({
  src: "fonts/Buttons.otf",
  variable: "--font-buttons",
  display: "swap",
});

const titlesFont = localFont({
  src: "fonts/titles.otf",
  variable: "--font-titles",
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
    <html
      lang="en"
      className={`${madmobFont.variable} ${textFont.variable} ${buttonsFont.variable} ${titlesFont.variable}`}
    >
      <body>
        <img
          src="/images/backgrounds/madmob.png"
          alt="Madmob logo"
          className="fixed top-5 left-6 z-50 w-14 h-auto opacity-90 pointer-events-none select-none"
        />
        {children}
        <DelayedMadBotWidget />
      </body>
    </html>
  );
}
