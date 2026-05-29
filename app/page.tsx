import Link from "next/link";

const weeks = [
  { week: 0, title: "Builder Setup" },
  { week: 1, title: "Generative Core" },
  { week: 2, title: "Research Agent" },
  { week: 3, title: "Product Architecture" },
  { week: 4, title: "Marketing Engine" },
  { week: 5, title: "Dashboard" },
  { week: 6, title: "Final Demo" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center px-6">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
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

      <section className="w-full max-w-5xl pb-24">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Project Roadmap
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weeks.map(({ week, title }) => (
            <div
              key={week}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Week {week}
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {title}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
