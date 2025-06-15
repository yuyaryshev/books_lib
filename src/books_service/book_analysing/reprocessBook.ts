import { BookId, BookMetadata, BookMetadata_fromRow } from "../../types/index.js";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { BOOKS_PROCESSING_BATCH } from "../../server/constants.js";
import { doProcessBook } from "./doProcessBook.js";

export async function reprocessBook(env: ServiceApiEnv, bookIds0?: BookId[] | undefined) {
    const bookIds = bookIds0 !== undefined ? bookIds0 : await env.tables.book_queue.select().limit(BOOKS_PROCESSING_BATCH);

    for (let bookId of bookIds) {
        const bookRow = await env.tables.books.getById(bookId);
        const bookBodyRow = await env.tables.book_bodies.getById(bookId);
        if (!bookRow) {
            throw new Error(`CODE00000004 BookId = ${bookId} - not found!`);
        }

        const bookMeta: BookMetadata = BookMetadata_fromRow(bookRow);
        const body = bookBodyRow?.body || `BOOK_BODY_NOT_FOUND bookId=${bookId}`;

        const processedBook = await doProcessBook(env, bookMeta, body);

        await env.tables.book_scene;

        // TODO Записывает результаты process_book в таблицу
        throw new Error(`CODE00000013 reprocessBook @notImplemented`);
    }
}
