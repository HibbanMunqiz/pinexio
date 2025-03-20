import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Metadata } from "next";
import {meta} from "../../config/meta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = meta

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="FbzCiOZJbHaT0wIWFrrHcj8kLY1Sf4S5d_jZP-K0loc" />
      </head>
      <body
        className={`
          ${geistSans.className}
          text-sm
          font-regular tracking-wide antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >

          {/* <ToastContainer /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
