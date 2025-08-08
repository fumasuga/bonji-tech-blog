"use client";
import Link from "next/link";
import { DateLabel } from "./date-label";
import { useDarkMode } from '@/hooks/useDarkMode';
import ThemeSwitcher from './theme-switcher';

export default function Header() {
  const [isDark, toggleTheme] = useDarkMode();
  return (
    <section className="md:flex-row md:justify-between mt-2 mb-2 px-2 md:px-0">
      <div className="flex flex-row justify-between items-center ml-2 mb-3 md:mb-6 border-b pb-2">
        <div className="flex flex-row">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight mb-0">
            <Link href="/" className="hover:underline">
              Bonji Tech
            </Link>
            .
          </h1>
          <ThemeSwitcher />
        </div>
        <DateLabel />
      </div>
    </section>
  );
};