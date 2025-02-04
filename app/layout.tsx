import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google"; // Import Inter font
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter", // Custom variable name for Inter font
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collabote U",
  description: "skill-sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`} // Add Inter variable here
      >
        <div className="min-h-screen w-full flex items-center bg-black justify-center">
          <div className="w-full jetbrains md:w-[768px] bg-bg-light h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
