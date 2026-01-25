import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import React, { FC, ReactNode, useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { SolanaProvider } from "./context/solanaProvider";
import ClientLayout from "./components/clientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pool-fun",
  description: "Pool to launch you token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SolanaProvider>
          <ClientLayout>{children} </ClientLayout>
        </SolanaProvider>
      </body>
    </html>
  );
}
