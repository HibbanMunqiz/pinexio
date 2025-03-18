import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pinexio.vercel.app'),
  title: "Pinexio - Documentation template",
  description: "A customizable Open Source documentation template built with Next.js",
  authors: [{ name: "Sanjay Rajeev" }],
  keywords: ['Pinexio', 'documentation template', 'tempalte', 'Next.js', 'React', 'JavaScript'],
  publisher: 'Sanjay Rajeev',
  creator: 'Sanjay Rajeev',
  openGraph: {
    type: "website",
    title: "Pinexio - Documentation Template",
    description: "A customizable open-source documentation template built with Next.js.",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Pinexio Documentation Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // Type of Twitter card
    title: "Pinexio - Documentation Template", // Twitter card title
    description: "A customizable open-source documentation template built with Next.js.", // Twitter card description
    images: ["/og_image.png"], // Image used in the Twitter card
    creator: "@YourTwitterHandle", // Twitter handle of the content creator (optional)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
