"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        setTheme('light')
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            className={`font-semibold absolute right-5 top-2 w-fit rounded-md bg-sky-500 p-2 text-sky-950 antialiased duration-200 hover:scale-110 hover:bg-sky-600 active:scale-100 dark:bg-slate-900 dark:text-sky-100 dark:hover:bg-sky-800 `}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "light" ? "Dark" : "Light"}
        </button>
    );
};
