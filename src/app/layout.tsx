import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Libertad Molina | Mentora Espiritual",
  description:
    "Mentora espiritual, tarot, sanación energética y transformación personal. Consultas personalizadas que conectan con tu alma.",
  keywords: [
    "tarot",
    "mentora espiritual",
    "sanación energética",
    "runas",
    "transformación personal",
    "Libertad Molina",
    "Yiceia",
  ],
  icons: {
    icon: "/logo_libertad.png",
  },
  openGraph: {
    title: "Libertad Molina | Mentora Espiritual",
    description:
      "Mentora espiritual, tarot, sanación energética y transformación personal. Consultas personalizadas que conectan con tu alma.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${playfair.variable} antialiased bg-[#0A0A0A] text-[#F5F5F5]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}