import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { reprocessBooksApi } from "../../api/index.js";
import { reprocessBook } from "../book_analysing/index.js";
export function reprocessBooksApiImpl(env: ServiceApiEnv) {
  implementHttpExpressApi(env.apiRoot, reprocessBooksApi, async (req: typeof reprocessBooksApi.request): Promise<typeof reprocessBooksApi.response> => {
    await reprocessBook(env, req.book_ids);
    const r: typeof reprocessBooksApi.response = {};
    return r;
  });
}