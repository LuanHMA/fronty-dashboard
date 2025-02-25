import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css'
import { AuthProvider } from "@/context/auth/provider";
import { SidebarProvider } from "@/context/sidebar";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fronty Digital - Dashboard",
  description: "Fronty Digital - Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} antialiased`}
      >
        <AuthProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
