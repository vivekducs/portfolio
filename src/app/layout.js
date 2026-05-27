import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://vivekducs.is-a.dev"),
  alternates: {
    canonical: "/",
  },
  title: "Vivek Kumar | AI Engineer & Full Stack Developer Portfolio",
  description:
    "Portfolio of Vivek Kumar — MCA Student, AI Engineer, Full Stack Developer & Backend Architect from Noida, India. Specializing in scalable AI-powered systems, real-time backends, and production-grade products.",
  keywords: [
    "Vivek Kumar",
    "AI Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "Node.js",
    "React.js",
    "Next.js",
    "Gemini API",
    "MCA Delhi University",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Vivek Kumar", url: "https://github.com/vivekducs" }],
  creator: "Vivek Kumar",
  openGraph: {
    type: "website",
    title: "Vivek Kumar | AI Engineer & Full Stack Developer",
    description:
      "Premium AI-powered engineering portfolio. Mathem Solvex · ObserveFlow · Palora. LeetCode Top 16.41% · 500+ DSA Problems · 3000+ Platform Users.",
    siteName: "Vivek Kumar Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Kumar | AI Engineer & Full Stack Developer",
    description:
      "Premium AI-powered engineering portfolio — scalable backends, AI integrations, and real-world products.",
    creator: "@vivekducs",
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
    google: "eWcF9dyaiktE_gTkn88SxvgDKUQIu5YDCgncdNA1oqk",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vivek Kumar",
    "jobTitle": "AI Engineer & Full Stack Developer",
    "url": "https://vivekducs.is-a.dev",
    "sameAs": [
      "https://github.com/vivekducs",
      "https://www.linkedin.com/in/vivekducs/"
    ],
    "knowsAbout": ["Artificial Intelligence", "Node.js", "React.js", "MongoDB", "System Architecture"]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1B1PNL16LK"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1B1PNL16LK');
            `,
          }}
        />
      </body>
    </html>
  );
}
