import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { getLastBooksApi, searchBooksApi } from "../../api/index.js";
import { BookMetadata, BookMetadata_fromRow } from "../../types/index.js";
import { MAX_LAST_BOOKS } from "../../server/constants.js";

export function getLastBooksApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, getLastBooksApi, async (req: typeof getLastBooksApi.request): Promise<typeof getLastBooksApi.response> => {
        const rows = await env.tables.books_last
            .knexTable()
            .join("books", "books_last.book_id", "books.id")
            .select("books.*", "books_last.ts")
            .orderBy("books_last.ts", "desc")
            .limit(MAX_LAST_BOOKS);

        const lastBooks: typeof getLastBooksApi.response["lastBooks"] = [];

        for (const row of rows) {
            const metadata: BookMetadata = BookMetadata_fromRow(row);
            const highlights = "";
            lastBooks.push({
                metadata,
                highlights,
            });
        }

        const r: typeof getLastBooksApi.response = {
            lastBooks: lastBooks,
        };
        return r;
    });
}
