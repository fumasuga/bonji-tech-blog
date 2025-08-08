'use client';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function SearchBox() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const router = useRouter();
  const [isDark] = useDarkMode();
  const pathname = usePathname();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/?q=${encodeURIComponent(search.trim())}`);
    } else if (search === '' && pathname === '/') {
      router.push('/');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="hidden md:block relative w-40 md:w-64">
      <input
        type="text"
        placeholder="Search the post..."
        className="block w-full pl-4 md:pl-10 pr-10 py-2 border border-gray-300 rounded-md text-xs md:text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={handleSearch}
        aria-label="Search"
      >
        <img src="/favicon/research.png" width="16" height="16" alt="Search Icon" className={`h-6 w-6 duration-350 hover:opacity-50 ${isDark ? "invert" : ""}`} />
      </button>
    </div>
  );
}
