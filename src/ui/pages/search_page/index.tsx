// search_page/index.tsx
import React, { useState } from "react";
import { searchBooksApi, SearchResult } from "../../../api";
import { useApiCaller } from "../../app/booksLibApiCaller";

export function SearchPage() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const apiCaller = useApiCaller();

    const handleSearch = async () => {
        try {
            const response = await apiCaller.searchBooks({ queryStr: query });
            setSearchResults(response.results);
        } catch (error) {
            console.error("Error occurred while searching:", error);
        }
    };

    const handleCardClick = (bookId: string) => {
        window.open(`/book/${bookId}`, "_blank"); // Open book page in new tab
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search books..." />
            <button onClick={handleSearch}>Search</button>

            <div>
                {searchResults.map((result, index) => (
                    <div key={index} onClick={() => handleCardClick(result.metadata.id + "")} style={{ cursor: "pointer" }}>
                        <h3>{result.metadata.name}</h3>
                        <p>{result.metadata.author}</p>
                        <p>{result.highlights}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
