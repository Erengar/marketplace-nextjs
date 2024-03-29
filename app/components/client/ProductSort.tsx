"use client";

import { MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

export default function ProductSort({
    sortSignal,
    setSortSignal,
}: {
    sortSignal: string;
    setSortSignal: React.Dispatch<React.SetStateAction<string>>;
}) {
    function handleSort(event: SelectChangeEvent<string>) {
        setSortSignal(event.target.value);
    }
    return (
        <Select
            label="Sort by"
            value={sortSignal}
            onChange={handleSort}
            sx={{height:"48px"}}
        >
            <MenuItem value="name">Name A-Z</MenuItem>
            <MenuItem value="-name">Name Z-A</MenuItem>
            <MenuItem value="price">Price From Lowest</MenuItem>
            <MenuItem value="-price">Price From Highest</MenuItem>
        </Select>
    );
}
