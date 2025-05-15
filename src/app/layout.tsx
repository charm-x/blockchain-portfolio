import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBackgroundWrapper from "@/components/ui/ClientBackgroundWrapper";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blockchain Developer Portfolio",
  description: "Smart Contract Engineer. dApp Builder. On-Chain Craftsman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-hex min-h-screen`}
        suppressHydrationWarning
      >
        {/* Blockchain network background */}
        <ClientBackgroundWrapper />

        <SidebarLayout>
          <main suppressHydrationWarning>
            {children}
            <SpeedInsights />
          </main>
        </SidebarLayout>
      </body>
    </html>
  );
}
