import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Drofandy - Engineering Excellence Through Innovation | Professional NDT & Environmental Services",
    template: "%s | Engineering Excellence"
  },
  description: "Comprehensive NDT, Environmental Engineering, and Academic Consulting Solutions. Professional engineering services with precision testing, sustainable practices, and research-backed expertise.",
  keywords: [
    "NDT testing",
    "Non-destructive testing",
    "Environmental engineering",
    "Academic consulting",
    "Industrial solutions",
    "Engineering services",
    "Quality assurance",
    "Technical consulting"
  ],
  authors: [{ name: "Engineering Excellence Team" }],
  creator: "Engineering Excellence",
  publisher: "Engineering Excellence",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://engineering-excellence.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://engineering-excellence.com",
    title: "Engineering Excellence Through Innovation",
    description: "Comprehensive NDT, Environmental Engineering, and Academic Consulting Solutions",
    siteName: "Engineering Excellence",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Engineering Excellence - Professional Engineering Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Excellence Through Innovation",
    description: "Comprehensive NDT, Environmental Engineering, and Academic Consulting Solutions",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
