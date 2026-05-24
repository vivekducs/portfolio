import { Geist, Geist_Mono } from "next/font/google";
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
  authors: [{ name: "Vivek Kumar", url: "https://github.com/AVPXM8" }],
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
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vivek Kumar",
    "jobTitle": "AI Engineer & Full Stack Developer",
    "url": "https://vivekkumar-portfolio.vercel.app",
    "sameAs": [
      "https://github.com/AVPXM8",
      "https://www.linkedin.com/in/vivek33pal/"
    ],
    "knowsAbout": ["Artificial Intelligence", "Node.js", "React.js", "MongoDB", "System Architecture"]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
