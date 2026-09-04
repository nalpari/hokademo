import type { Metadata, Viewport } from "next";
import { Anton } from "next/font/google";
import "./globals.css";
import Dock from "@/components/Dock";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "호카코리아",
  description: "HOKA 러닝화와 트레일 기어. TOGETHER WE FLY HIGHER.",
};

export const viewport: Viewport = {
  themeColor: "#16191c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={anton.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body>
        <div className="shell">{children}</div>
        <Dock />
      </body>
    </html>
  );
}
