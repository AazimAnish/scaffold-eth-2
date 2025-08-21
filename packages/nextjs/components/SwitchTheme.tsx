"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/ui/tooltip";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    try {
      console.log("Current theme:", theme, "Resolved theme:", resolvedTheme);
      if (isDarkMode) {
        console.log("Switching to light mode");
        setTheme("light");
      } else {
        console.log("Switching to dark mode");
        setTheme("dark");
      }
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };

  useEffect(() => {
    setMounted(true);
    console.log("Theme component mounted. Current theme:", theme, "Resolved:", resolvedTheme);
  }, [theme, resolvedTheme]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className={className} aria-label="Toggle theme" disabled>
        <SunIcon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleToggle} className={className} aria-label="Toggle theme">
            <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {isDarkMode ? "light" : "dark"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
