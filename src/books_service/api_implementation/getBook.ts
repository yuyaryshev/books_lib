import { httpApiDefinition, httpApiFunction } from "yhttp_api";
import { object, string, number, array, anyJson } from "yuyaryshev-json-type-validation";
import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { getBookApi } from "../../api/index.js";
import { BookId, BookMetadata, decoderBookMetadata } from "../../types/index.js";

export function getBookApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, getBookApi, async (req: typeof getBookApi.request): Promise<typeof getBookApi.response> => {
        const bookRow = await env.tables.books.getById(req.bookId);
        const bookBodyRow = await env.tables.book_bodies.getById(req.bookId);

        if (!bookRow) {
            throw new Error(`CODE00000004 BookId = ${req.bookId} - not found!`);
        }

        const parsedTags = JSON.parse(bookRow.tags);
        const metadata: BookMetadata = {
            id: req.bookId,
            name: bookRow.name,
            description: bookRow.description,
            author: bookRow.author,
            myMark: bookRow.myMark,
            tags: parsedTags,
        };
        const body = bookBodyRow?.body || `BOOK_BODY_NOT_FOUND bookId=${req.bookId}`;
        const r: typeof getBookApi.response = { metadata, body };
        return r;
    });
}
