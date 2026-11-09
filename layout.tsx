import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import Effects from "@/components/site/Effects";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { SITE } from "@/content/site";
import "./globals.css";

// Fontes hospedadas no próprio site (sem Google Fonts): mais rápidas e melhores para a LGPD.
const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-variable.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/newsreader-italic-variable.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});
const publicSans = localFont({
  src: [{ path: "./fonts/public-sans-variable.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Legisla Brasil", template: "%s | Legisla Brasil" },
  description: SITE.description,
  openGraph: { type: "website", locale: "pt_BR", siteName: "Legisla Brasil", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Legisla Brasil" }] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#E7E7E7", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${newsreader.variable} ${publicSans.variable}`} lang="pt-BR">
      <body>
        <a className="lg-skip" href="#conteudo">Pular para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
