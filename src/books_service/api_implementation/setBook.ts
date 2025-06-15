import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { setBookApi } from "../../api/index.js";
import { BookBodyRowT } from "../db/index.js";
import { reindexBook } from "../book_analysing/index.js";

export function setBookApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, setBookApi, async (req: typeof setBookApi.request): Promise<typeof setBookApi.response> => {
        const bookId = req.bookId;
        const bookBodyRow: BookBodyRowT = {
            id: bookId,
            body: req.body,
        };
        await env.tables.book_bodies.upsertById(bookBodyRow);
        await reindexBook(env, bookId);
        return {};
    });
}
