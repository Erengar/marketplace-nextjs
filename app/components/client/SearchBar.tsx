"use client"
import { debounce } from "lodash"
import { useEffect, useRef } from "react"

type SearchBarProps = {
    query: string;
    className?: string;
    searchQuery: string | null;
    setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;

}

export default function SearchBar({query, className, searchQuery, setSearchQuery}: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = searchQuery || ""
        }
    }, [searchQuery])

    const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }, 750)
    return (
        <>
            <label htmlFor="search-bar" className="sr-only">Search for {query}</label>
            <input
            ref={inputRef}
            onChange={handleSearch}
            id="search-bar"
            type="text"
            placeholder={`Search ${query}`}
            className={className}/>
        </>
    )
}