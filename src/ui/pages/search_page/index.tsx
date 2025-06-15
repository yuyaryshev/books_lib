import React, { useState } from "react";
import { SearchResult } from "../../../api";
import { useApiCaller } from "../../app/booksLibApiCaller";
import { SearchResultsList } from "../../components";

export function SearchPage() {
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const apiCaller = useApiCaller();

    const handleSearch = async () => {
        try {
            setSearching(true);
            const response = await apiCaller.searchBooks({ queryStr: query });
            setSearchResults(response.results);
            setSearching(false);
        } catch (error) {
            console.error("Error occurred while searching:", error);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const onSearchFieldChange = (e: any) => setQuery(e.target.value);

    return (
        <div>
            <input type="text" value={query} onChange={onSearchFieldChange} onKeyUp={handleKeyUp} placeholder="Search books..." />
            <button onClick={handleSearch}>Search</button>
            {searching ? <div>Searching...</div> : <SearchResultsList results={searchResults} />}
        </div>
    );
}
