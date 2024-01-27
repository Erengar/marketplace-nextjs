"use client"
import { debounce } from "lodash"
import { useEffect } from "react"

export default function SearchBar({query, className, searchQuery, setSearchQuery}: {query: string, className?: string, searchQuery: string | null, setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>}) {
    let input : HTMLInputElement | null = null
    useEffect(() => {
        input = document.getElementById("search-bar") as HTMLInputElement
    }, [])
    useEffect(() => {
        input!.value = searchQuery || ""
    }, [searchQuery])


    const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }, 750)
    return (
        <>
            <label htmlFor="search-bar" className="sr-only">Search for {query}</label>
            <input
            onChange={handleSearch}
            id="search-bar"
            type="text"
            placeholder={`Search ${query}`}
            className={className}/>
        </>
    )
}