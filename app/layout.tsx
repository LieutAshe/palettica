import type { Metadata } from "next";
import "./globals.css";

import { Quicksand } from "next/font/google";
import { ColorProvider } from "./context/colorContext";

const quickSand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Palettica",
  description: "A color palette generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quickSand.variable} antialiased
          bg-[#171717] 
        `}
      >
        <ColorProvider>
        {children}
        </ColorProvider>
      </body>
    </html>
  );
}
