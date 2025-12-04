import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Pulpo font for headlines
const pulpo = localFont({
  src: [
    {
      path: "../../fonts/Pulpo-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/Pulpo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Pulpo-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/Pulpo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/Pulpo-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../fonts/Pulpo-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../fonts/Pulpo-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/Pulpo-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/Pulpo-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../fonts/Pulpo-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-pulpo",
  display: "swap",
});

// Araboto font for body text
const araboto = localFont({
  src: [
    {
      path: "../../fonts/Araboto Thin 400.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../fonts/Araboto Light 400.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/Araboto Normal 400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Araboto Medium 400.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/Araboto Bold 400.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/Araboto Black 400.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-araboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Top 25 Cigars of the Year 2025 | Cigar Aficionado",
  description: "Discover the top 25 cigars of 2025 as selected by Cigar Aficionado's expert reviewers. Watch as we reveal the most exciting cigars of the year, one by one.",
  keywords: ["cigar", "top 25", "2025", "cigar aficionado", "cigars", "premium cigars", "cigar ratings"],
  authors: [{ name: "Cigar Aficionado" }],
  icons: {
    icon: "/images/hero/cigar_aficionado_logo.ico",
    shortcut: "/images/hero/cigar_aficionado_logo.ico",
    apple: "/images/hero/cigar_aficionado_logo.ico",
  },
  openGraph: {
    title: "Top 25 Cigars of the Year 2025 | Cigar Aficionado",
    description: "Discover the top 25 cigars of 2025 as selected by Cigar Aficionado's expert reviewers.",
    type: "website",
    siteName: "Cigar Aficionado",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://top25.cigaraficionado.com"}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Cigar Aficionado Top 25 Cigars of 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 25 Cigars of the Year 2025 | Cigar Aficionado",
    description: "Discover the top 25 cigars of 2025 as selected by Cigar Aficionado's expert reviewers.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://top25.cigaraficionado.com"}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://top25.cigaraficionado.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pulpo.variable} ${araboto.variable}`} suppressHydrationWarning>
      <body
        className={`${araboto.className} antialiased bg-cream min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* Google Analytics - Update with Cigar Aficionado tracking ID */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script> */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
