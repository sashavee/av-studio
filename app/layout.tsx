import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = DM_Sans({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AV Studio — AI Content for Brands",
  description: "Photos, videos, and sound for B2C brands — fast, on-brand, ready to run.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${bebas.variable}`} style={{ background: "#faf9f6" }}>
      <body style={{ background: "#faf9f6", color: "#1c1a17" }}>
        {children}
      </body>
    </html>
  );
}
