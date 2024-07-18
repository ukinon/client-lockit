import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";

const poppins = Poppins({ weight: "300", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LockIt App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className + " " + "flex justify-center w-screen"}
      >
        <div className="w-screen max-w-[375px] mx-[5vw] my-0 mt-[8dvh] relative">
          <Navbar />
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
