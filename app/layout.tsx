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
  title: "Enzo",
  description: "Unleash your project's potential",
   icons: {
    icon: '/ui/enzo.svg', // or '/logo.svg', '/logo.png'
    apple: '/apple-touch-icon.png', // Optional: for iOS devices
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
