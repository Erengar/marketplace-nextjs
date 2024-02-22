"use client";
import { CategoryType } from "@/db/schema";
import { Box, Tab, Tabs } from "@mui/material";
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
                            label={category.name}
                            sx={{
                                fontWeight: 600,
                                opacity: 1,
                                color: "rgb(2 132 199)",
                                height: "48px",
                                width: "128px",
                            }}
                        />
                    </Link>
                ))}
            </Tabs>
        </Box>
    );
}
