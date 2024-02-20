import { httpApiDefinition, httpApiFunction } from "yhttp_api";
import { object, string, number, array, anyJson } from "yuyaryshev-json-type-validation";
import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { searchBooksApi } from "../../api/index.js";
import { BookId, BookMetadata, decoderBookMetadata } from "../../types/index.js";

export function searchBooksApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, searchBooksApi, async (req: typeof searchBooksApi.request): Promise<typeof searchBooksApi.response> => {
        const metadata: BookMetadata = {
            id: "BookId",
            name: "book name here",
            author: "author here",
            myMark: 3,
            tags: ["tag1", "tag2"],
        };

        const r: typeof searchBooksApi.response = { results: [{ metadata, highlights: "highlights here" }] };
        return r;
    });
}
