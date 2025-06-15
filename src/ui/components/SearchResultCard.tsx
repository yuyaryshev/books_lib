import React from "react";
import { SearchResult } from "../../api";

export interface SearchResultCardProps {
    result: SearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
    const handleCardClick = () => {
        // Open book page in new tab
        window.open(`/book/${result.metadata.id}`, "_blank");
    };

    return (
        <div onClick={handleCardClick} style={{ cursor: "pointer" }}>
            <h3>{result.metadata.name}</h3>
            <p>{result.metadata.author}</p>
            <p>{result.highlights}</p>
        </div>
    );
}
