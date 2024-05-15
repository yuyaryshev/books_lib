import { httpApiDefinition, httpApiFunction } from "yhttp_api";
import { object, string, number, array, anyJson } from "yuyaryshev-json-type-validation";
import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { setLastBooksApi } from "../../api/index.js";
import { BookId, BookMetadata, decoderBookMetadata } from "../../types/index.js";
export function setLastBooksApiImpl(env: ServiceApiEnv) {
  implementHttpExpressApi(env.apiRoot, setLastBooksApi, async (req: typeof setLastBooksApi.request): Promise<typeof setLastBooksApi.response> => {
    const metadata: BookMetadata = {
      id: "BookId",
      name: "book name here",
      author: "author here",
      myMark: 3,
      tags: ["tag1", "tag2"]
    };
    const body = "Test book body";
    const r: typeof setLastBooksApi.response = {
      metadata,
      body
    };
    return r;
  });
}