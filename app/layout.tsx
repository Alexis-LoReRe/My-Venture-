import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Venture",
  description: "AI-Powered Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              My Venture
            </Link>
            <ul className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
              <li>
                <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/core" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Core
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Alexis Lona
        </footer>
      </body>
    </html>
  );
}
