import Footer from "@/app/_components/footer";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// メタデータをmetadataオブジェクトに集約
export const metadata: Metadata = {
  title: `Bonji Tech Blog | My Tech Journey`,
  description: `It showcases how to study about Tech and share knowledge. I usually post what I have learned.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
  icons: {
    icon: [
      { url: '/favicon/egg-fried.svg', type: 'image/svg+xml' },
      { url: '/favicon/egg-fried.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon/egg-fried.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    apple: '/favicon/egg-fried.svg', // SVGをapple-touch-iconとして指定
  },
  manifest: '/favicon/site.webmanifest',
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/favicon/browserconfig.xml',
    'theme-color': '#000',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}