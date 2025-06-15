import { httpApiDefinition } from "yhttp_api";
import { array, Decoder, object, string } from "yuyaryshev-json-type-validation";
import { BookMetadata, decoderBookMetadata } from "../types/BookMetadata.js";

export interface SearchResult {
    metadata: BookMetadata;
    highlights: string;
}

export const decoderSearchResult: Decoder<SearchResult> = object({
    metadata: decoderBookMetadata,
    highlights: string(),
});
export const searchBooksApi = httpApiDefinition(
    "search",
    {
        queryStr: string(),
    },
    {
        results: array(decoderSearchResult),
    },
    {
        // Use method: 'GET' to limit API to only HTTP GET. Recommended value for method=undefined. method=undefined means than any type of request will be processed (GET,POST,PUT, etc).
        // Fields for GET requests are taken from queryParams (searchParams), for PUSH - are parsed from JSON body. This convension is of course also applied when method is undefined
    },
);
