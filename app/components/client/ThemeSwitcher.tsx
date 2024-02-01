"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        //Remove later, when dark styling is implemented
        setTheme("light");
    }, []);

    //Remove later, when dark styling is implemented
    return null;

    if (!mounted) {
        return null;
    }

    return (
        <button
            className={`absolute right-5 top-2 w-fit rounded-md bg-slate-200 p-2 duration-200 hover:scale-110 active:scale-100 dark:bg-zinc-950`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "light" ? "Dark" : "Light"}
        </button>
    );
};
