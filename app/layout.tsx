import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const seoData = {
  title: "Harmanpreet Singh - Full Stack Developer",
  absoluteTitle: "Harmanpreet Singh | Full Stack Developer & Software Engineer",
  ogTitle: "Harmanpreet Singh - Full Stack Developer Portfolio",
  description: "Full Stack Developer specializing in React, Node.js, Flutter, and cloud technologies. Building scalable web and mobile applications with modern tech stacks.",
  keywords: [
    "Harmanpreet Singh",
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "Flutter",
    "JavaScript",
    "TypeScript",
    "Python",
    "Software Engineer",
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "Portfolio",
    "Programmer"
  ],
  author: {
    name: "Harmanpreet Singh",
    email: "harmanpreetsingh@programmer.net",
    twitterUrl: "https://x.com/harmanpreet277", // Update with your actual Twitter
    twitterAddress: "@harmanpreet277", // Update with your actual Twitter handle
    githubUrl: "https://github.com/HarmanPreet-Singh-XYT", // Update with your actual GitHub
    linkedinUrl: "https://www.linkedin.com/in/harman-developer/", // Update with your actual LinkedIn
  },
};
// Helper function to get the base URL
function getUrl() {
  return "https://harmanita.com"
}
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Harmanpreet Singh",
    default: seoData.title,
    absolute: seoData.absoluteTitle,
  },
  generator: seoData.author.name,
  applicationName: seoData.title,
  description: seoData.description,
  referrer: "origin-when-cross-origin",
  keywords: seoData.keywords,
  authors: [
    {
      name: seoData.author.name,
      url: seoData.author.linkedinUrl,
    },
  ],
  creator: seoData.author.name,
  publisher: seoData.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getUrl()),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true, // Changed to true for personal website visibility
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: ["/favicons/favicon-32x32.png"],
    apple: [
      { url: "/favicons/apple-icon.png" },
      { url: "/favicons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicons/apple-icon-precomposed.png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getUrl(),
    title: seoData.ogTitle,
    description: seoData.description,
    siteName: seoData.title,

  },
  twitter: {
    card: "summary_large_image",
    title: seoData.ogTitle,
    description: seoData.description,
    creator: seoData.author.twitterAddress,
  },
  appleWebApp: {
    capable: true,
    title: seoData.title,
    statusBarStyle: "black-translucent",
  },
  // Additional metadata for developer portfolio
  other: {
    "github-user": seoData.author.githubUrl,
    "linkedin-profile": seoData.author.linkedinUrl,
    "contact-email": seoData.author.email,
    "skills": "JavaScript, TypeScript, React, Node.js, Flutter, Python, Full Stack Development",
    "location": "Punjab, India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="__next"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
