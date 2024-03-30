import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " DailyNetflixCookies.in",
  description: "Netflix cookies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script
          type="text/javascript"
          src="//pl22914354.profitablegatecpm.com/0b/3c/63/0b3c63088e1d158d77a280b101ebe508.js"
        />
      </Head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
