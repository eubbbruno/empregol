import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
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
        className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
