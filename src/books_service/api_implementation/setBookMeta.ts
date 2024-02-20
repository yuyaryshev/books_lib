import { httpApiDefinition, httpApiFunction } from "yhttp_api";
import { object, string, number, array, anyJson } from "yuyaryshev-json-type-validation";
import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { setBookMetaApi } from "../../api/index.js";
import { BookId, BookMetadata, decoderBookMetadata } from "../../types/index.js";

export function setBookMetaApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, setBookMetaApi, async (req: typeof setBookMetaApi.request): Promise<typeof setBookMetaApi.response> => {
        const metadata: BookMetadata = {
            id: "BookId",
            name: "book name here",
            author: "author here",
            myMark: 3,
            tags: ["tag1", "tag2"],
        };
        const body = "Test book body";
        const r: typeof setBookMetaApi.response = { metadata, body };
        return r;
    });
}
