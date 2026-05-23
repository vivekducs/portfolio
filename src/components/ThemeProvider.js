"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage or system preferences on mount
    const savedTheme = localStorage.getItem("vk-theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // Default is Light Mode as per explicit instructions
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("vk-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  // Prevent hydration mismatch by not rendering theme-dependent classes immediately
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
