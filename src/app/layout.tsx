import type { Metadata } from "next";
import { Instrument_Serif, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-instrument" });

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
    <html lang="pt-BR" className={`${sora.variable} ${instrument.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
