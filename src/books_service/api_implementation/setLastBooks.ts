import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { setLastBooksApi } from "../../api/index.js";

export function setLastBooksApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, setLastBooksApi, async (req: typeof setLastBooksApi.request): Promise<typeof setLastBooksApi.response> => {
        for (let bookId of req.lastBooks) {
            await env.tables.books_last.touch(bookId);
        }
        return {};
    });
}
