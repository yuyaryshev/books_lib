import React from "react";
import { SearchResult } from "../../api";
import { SearchResultCard } from "./SearchResultCard";

export interface SearchResultsListProps {
    results: SearchResult[];
}

export function SearchResultsList({ results }: SearchResultsListProps) {
    return (
        <div>
            {results.map((result) => (
                <SearchResultCard key={result.metadata.id} result={result} />
            ))}
        </div>
    );
}
