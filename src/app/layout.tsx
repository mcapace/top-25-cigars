import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable}`} suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-cream min-h-screen flex flex-col`}
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
        {children}
      </body>
    </html>
  );
}
