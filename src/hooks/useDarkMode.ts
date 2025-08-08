"use client";
import { useState, useEffect } from "react";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "dark" || localTheme === "light") {
      return localTheme;
    }
  }
  return "light";
};

export const useDarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);

    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      if (currentTheme) {
        setTheme(currentTheme as "light" | "dark");
        localStorage.setItem("theme", currentTheme);
      }
    };
    
    window.addEventListener("storage", checkTheme);
    const mutation = new MutationObserver(checkTheme);
    mutation.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("storage", checkTheme);
      mutation.disconnect();
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";

  return [isDark, toggleTheme] as const;
};