import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { searchBooksApi } from "../../api/index.js";
import { BookMetadata, BookMetadata_fromRow } from "../../types/index.js";

function extractHighlights(body: string, queryStr: string, contextLength = 100, maxTotalLength = 1000): string {
    if (!queryStr) return "";

    const lowerBody = body.toLowerCase();
    const lowerQuery = queryStr.toLowerCase();
    const matches: string[] = [];
    let index = 0;

    while ((index = lowerBody.indexOf(lowerQuery, index)) !== -1) {
        const start = Math.max(0, index - contextLength);
        const end = Math.min(body.length, index + queryStr.length + contextLength);
        let snippet = body.slice(start, end);

        // Highlight the exact match case-insensitively
        const originalMatch = body.slice(index, index + queryStr.length);
        snippet = snippet.replace(new RegExp(originalMatch, "i"), `<b>${originalMatch}</b>`);

        matches.push(snippet.trim());
        index += queryStr.length;

        if (matches.join("... ").length >= maxTotalLength) break;
    }

    return matches.join("... ").slice(0, maxTotalLength);
}

export function searchBooksApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, searchBooksApi, async (req: typeof searchBooksApi.request): Promise<typeof searchBooksApi.response> => {
        const r: typeof searchBooksApi.response = {
            results: [],
        };

        const queryStr = req.queryStr;

        const rows = await env.tables.books
            .knexTable()
            .join("book_bodies", "book_bodies.id", "books.id")
            .select("books.*", "book_bodies.body")
            .where(function () {
                this.where("books.name", "like", `%${queryStr}%`).orWhere("book_bodies.body", "like", `%${queryStr}%`);
            });

        for (const row of rows) {
            const metadata: BookMetadata = BookMetadata_fromRow(row);
            const s = `name:${metadata.name}\n${row.body}`;
            const highlights = extractHighlights(s, queryStr);

            r.results.push({
                metadata,
                highlights,
            });
        }

        return r;
    });
}
