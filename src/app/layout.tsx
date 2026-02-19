import type { Metadata } from "next";
import { Poppins, Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mulish", // This allows you to use it in CSS/Tailwind
});

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"], // specify the weights you need
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PCMS — Church of Pentecost Management System",
  description:
    "Unified platform for membership, attendance, finance, and ministry administration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mulish.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
