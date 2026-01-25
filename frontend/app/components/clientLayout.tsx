"use client";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
const Navbar = dynamic(() => import("./navbar"), {
  ssr: false,
});
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
