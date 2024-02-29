import { httpApiDefinition, httpApiFunction } from "yhttp_api";
import { object, string, number, array, anyJson, boolean, optional } from "yuyaryshev-json-type-validation";

import { decoderSearchResult } from "./searchBooksApi.js";

export const getLastBooksApi = httpApiDefinition(
    "getLastBooks",
    {
        // Includes fields from JSON body, also includes headers. Body owerwrite header fields
        //t:"example",
        unused: optional(boolean()),
    },
    {
        lastBooks: array(decoderSearchResult),
    },
    {
        // Use method: 'GET' to limit API to only HTTP GET. Recommended value for method=undefined. method=undefined means than any type of request will be processed (GET,POST,PUT, etc).
        // Fields for GET requests are taken from queryParams (searchParams), for PUSH - are parsed from JSON body. This convension is of course also applied when method is undefined
    },
);
