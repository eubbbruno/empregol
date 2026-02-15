import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/geom/300.css";
import "@fontsource/geom/400.css";
import "@fontsource/geom/500.css";
import "@fontsource/geom/600.css";
import "@fontsource/geom/700.css";
import "@fontsource/geom/800.css";
import "@fontsource/geom/900.css";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EmpreGol - Sua Próxima Oportunidade de Carreira",
  description:
    "Encontre as melhores vagas de emprego do Brasil. Plataforma premium com IA para conectar candidatos e empresas. Cadastro gratuito.",
  keywords: [
    "vagas de emprego",
    "oportunidades de carreira",
    "recrutamento",
    "empregos brasil",
    "plataforma de vagas",
  ],
  authors: [{ name: "EmpreGol" }],
  openGraph: {
    title: "EmpreGol - Sua Próxima Oportunidade de Carreira",
    description:
      "Encontre as melhores vagas de emprego do Brasil. Plataforma premium com IA.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmpreGol - Sua Próxima Oportunidade de Carreira",
    description:
      "Encontre as melhores vagas de emprego do Brasil. Plataforma premium com IA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
