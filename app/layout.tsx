import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techie Love",
  description: "Netflix cookies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
