import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enzo - AI-Powered Project Management for Young Creators | Collaborate & Manage Tasks",
  description: "Empower young creators with Enzo - an intuitive AI-powered project management platform. Collaborate with teams, manage tasks effortlessly, share ideas in the community, and climb the leaderboard. Perfect for emerging talent.",
  keywords: ["project management", "AI project management", "young creators", "team collaboration", "task management", "creative projects", "youth platform", "project planning", "teamwork tools"],
  authors: [{ name: "Enzo Team" }],
  creator: "Enzo",
  publisher: "Enzo",
  metadataBase: new URL('https://enzo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Enzo - AI Project Management for Young Creators",
    description: "Unleash your project's potential with AI-powered task management, team collaboration, and creative community features.",
    url: 'https://enzo.com',
    siteName: 'Enzo',
    images: [
      {
        url: '/ui/hero-img.svg',
        width: 1200,
        height: 630,
        alt: 'Enzo Project Management Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Enzo - AI Project Management for Young Creators",
    description: "Empower your projects with AI-powered collaboration tools designed for emerging talent.",
    images: ['/ui/hero-img.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/ui/enzo.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
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
        className={`${poppins.variable}  min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
