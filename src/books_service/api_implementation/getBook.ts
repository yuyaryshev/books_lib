import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { getBookApi } from "../../api/index.js";
import { BookMetadata, BookMetadata_fromRow } from "../../types/index.js";
export function getBookApiImpl(env: ServiceApiEnv) {
  implementHttpExpressApi(env.apiRoot, getBookApi, async (req: typeof getBookApi.request): Promise<typeof getBookApi.response> => {
    const bookRow = await env.tables.books.getById(req.bookId);
    const bookBodyRow = await env.tables.book_bodies.getById(req.bookId);
    if (!bookRow) {
      throw new Error(`CODE00000004 BookId = ${req.bookId} - not found!`);
    }
    const metadata: BookMetadata = BookMetadata_fromRow(bookRow);
    const body = bookBodyRow?.body || `BOOK_BODY_NOT_FOUND bookId=${req.bookId}`;
    const r: typeof getBookApi.response = {
      metadata,
      body
    };
    return r;
  });
}