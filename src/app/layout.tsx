import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AccessibilityWidget } from "@/components/udyam/accessibility-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UDYAM REGISTRATION",
  description: "Udyam Registration Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <AccessibilityWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
