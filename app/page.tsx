import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
        My Venture
      </h1>
      <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
        AI-Powered Web Application
      </p>
      <div className="mt-10 flex gap-4">
        <Link
          href="/docs"
          className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
