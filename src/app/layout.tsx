import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MatchTech",
  description: "Swipe-based hiring platform for modern teams and candidates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans.variable}>
        <div className="app-shell">
          <header className="app-header">
            <div className="app-header-inner">
              <div className="app-logo">MatchTech</div>
            </div>
          </header>

          <main className="app-main">
            <div className="app-container">{children}</div>
          </main>

          <footer className="app-footer">
            <div className="app-footer-inner">
              <span className="app-footer-text">
                © {new Date().getFullYear()} MatchTech. All rights reserved.
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
