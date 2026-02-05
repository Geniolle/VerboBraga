import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Verbo da Vida Braga | Igreja Cristã",
  description:
    "Uma igreja em Braga conectada ao Ministério Verbo da Vida, com foco em Palavra, fé e amor.",
  metadataBase: new URL("https://verbodavida-braga.vercel.app"),
  openGraph: {
    title: "Verbo da Vida Braga",
    description: "Conheça a história, propósito e departamentos da Verbo da Vida Braga.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${space.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
