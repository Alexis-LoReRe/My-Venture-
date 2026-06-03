"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/core", label: "Core" },
  { href: "/research", label: "Research" },
  { href: "/docs", label: "Docs" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
      {LINKS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              className={`transition-colors ${
                active
                  ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
