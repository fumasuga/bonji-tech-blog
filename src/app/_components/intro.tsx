"use client";
import { DateLabel } from "./date-label";
import ThemeSwitcher from "./theme-switcher";
import SearchBox from "./search-box";
import { useDarkMode } from '@/hooks/useDarkMode';

export function Intro() {
  const [isDark] = useDarkMode();

  return (
    <section className="flex flex-col mt-2 mb-2 px-2 md:px-0">
      <div className="flex flex-row justify-between ml-2 border-b pb-2 mb-2">
        <div className="flex flex-row">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight mb-0">
            Bonji Tech.
          </h1>
          <ThemeSwitcher />
        </div>
        <DateLabel />
      </div>
      <div className="items-center mt-2 mb-2">
        <SearchBox />
      </div>
    </section>
  );
}
