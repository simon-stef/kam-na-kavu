// src/app/layout.tsx

import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthProvider from "../components/AuthProvider";
import {ThemeProvider} from "../components/ThemeProvider"; // Import custom ThemeProvider

export const metadata: Metadata = {
  title: "KamNaKávu",
  description: "Webstránka na hodnotenie kaviární.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
              </div>
              <main style={{ flexGrow: 1 }}>
                {children}
              </main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
