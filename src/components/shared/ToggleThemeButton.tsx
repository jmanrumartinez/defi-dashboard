import React from "react";
import { Sun, Moon } from "lucide-react";

export const ToggleThemeButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const [isDark, setIsDark] = React.useState(false);
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button onClick={toggleTheme} className="w-full" {...props}>
      {isDark ? (
        <Sun className="mr-3 h-4 w-4" />
      ) : (
        <Moon className="mr-3 h-4 w-4" />
      )}
      <span>Switch to {isDark ? "Light" : "Dark"} Theme</span>
    </button>
  );
};
