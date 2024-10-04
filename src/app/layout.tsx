//src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import SimpleBottomNavigation from "@/components/NavBar";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Kam na kávu",
  description: "Webstránka na hodnotenie kaviární",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={inter.className} style={{ margin: 0, padding: 0, height: '100vh', width: "100%", display: 'flex', flexDirection: 'column' }}>
        {/* Main content container */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children} {/* Page content */}
        </div>
        <SimpleBottomNavigation />
        </body>
    </html>
  );
}
