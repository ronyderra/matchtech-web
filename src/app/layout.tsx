import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_SLUG,
  DEFAULT_TITLE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_THEME_COLOR,
  SITE_URL,
} from "@/lib/seo/site";
import { absoluteUrl } from "@/lib/seo/url";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/brand/favicon-all-blue.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        url: "/brand/favicon-all-blue.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/brand/favicon-all-blue.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE_SLUG),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Swipe-first hiring`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE_SLUG)],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: SITE_THEME_COLOR,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_LOCALE}>
      <body className={sourceSans.variable}>
        {children}
      </body>
    </html>
  );
}
