import { httpApiDefinition, httpApiFunction } from "yhttp_api";
import { object, string, number, array, anyJson } from "yuyaryshev-json-type-validation";
import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { getBookApi } from "../../api/index.js";
import { BookId, BookMetadata, decoderBookMetadata } from "../../types/index.js";

export function getBookApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, getBookApi, async (req: typeof getBookApi.request): Promise<typeof getBookApi.response> => {
        const metadata: BookMetadata = {
            id: "BookId",
            name: "book name here",
            author: "author here",
            myMark: 3,
            tags: ["tag1", "tag2"],
        };
        const body = "Test book body";
        const r: typeof getBookApi.response = { metadata, body };
        return r;
    });
}
