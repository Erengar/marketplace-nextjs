"use client";
import { CategoryType } from "@/db/schema";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({
    categories,
}: {
    categories: CategoryType[];
}) {
    const pathName = usePathname();
    const ar = categories.map((category) => category.slug);
    const valueIndex = ar.findIndex((slug) => slug === pathName.substring(1));
    return (
        <Box>
            <Tabs orientation="vertical" value={valueIndex}>
                {categories.map((category, index) => (
                    <Link href={`${category.slug}`} scroll={false} key={index}>
                        <Tab
                            className="h-12 w-32 font-semibold text-sky-500 opacity-100"
                            label={category.name}
                        />
                    </Link>
                ))}
            </Tabs>
        </Box>
    );
}
