
import type { Metadata } from "next";
import { Jersey_10 } from "next/font/google";
import "./globals.css";


const jersey10 = Jersey_10({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memory Card Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jersey10.className}>{children}</body>
    </html>
  );
}
