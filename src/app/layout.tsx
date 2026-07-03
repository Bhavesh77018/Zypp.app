import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import FloatingCTA from "@/components/FloatingCTA";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zypp Electric: Scooter & Loader Rental for Delivery Services",
  description: "Rent electric 2W scooters & 3W Loader with Zypp. Affordable EV rental solutions for delivery partners & businesses. Eco-friendly last-mile delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <AnalyticsTracker />
          <ScrollProgress />
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <FloatingCTA />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
