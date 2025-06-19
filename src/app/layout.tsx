import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thoeurn Ratha - Portfolio",
  description: "Portfolio of Thoeurn Ratha, a Full-Stack Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scroll-smooth">{children}</body>
    </html>
  );
}