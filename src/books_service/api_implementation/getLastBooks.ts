import { httpApiDefinition, httpApiFunction } from "yhttp_api";
import { object, string, number, array, anyJson } from "yuyaryshev-json-type-validation";
import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { getLastBooksApi } from "../../api/index.js";
import { BookId, BookMetadata, decoderBookMetadata } from "../../types/index.js";

export function getLastBooksApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, getLastBooksApi, async (req: typeof getLastBooksApi.request): Promise<typeof getLastBooksApi.response> => {
        const metadata: BookMetadata = {
            id: "BookId",
            name: "book name here",
            author: "author here",
            myMark: 3,
            tags: ["tag1", "tag2"],
        };
        const highlights = "Test book body";
        const r: typeof getLastBooksApi.response = { lastBooks: [{ metadata, highlights }] };
        return r;
    });
}
