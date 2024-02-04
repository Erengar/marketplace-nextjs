"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        setTheme("light");
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            className={`text-xs md:text-base absolute right-5 top-1 md:top-2 h-fit w-fit rounded-md bg-sky-500 px-1 pb-1 pt-0.5 md:px-2 md:pb-1 font-semibold text-sky-950 antialiased duration-200 hover:scale-110 hover:bg-sky-600 active:scale-100 dark:bg-slate-900 dark:text-sky-100 dark:hover:bg-sky-800 `}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "light" ? "Dark" : "Light"}
        </button>
    );
};
