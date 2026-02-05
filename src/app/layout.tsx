import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
