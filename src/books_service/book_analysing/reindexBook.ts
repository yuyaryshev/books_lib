import type { BookId } from "../../types/index.js";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
export async function reindexBook(env: ServiceApiEnv, bookId: BookId) {
  await env.tables.book_queue.upsert({
    book_id: bookId
  });
}