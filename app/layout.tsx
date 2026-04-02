import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Manrope, Nunito} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-helvetica" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-ginto" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-typoround" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VizForge",
  description: "A LeetCode-style problem visualizer where it visualizes the problem description for you",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${manrope.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
