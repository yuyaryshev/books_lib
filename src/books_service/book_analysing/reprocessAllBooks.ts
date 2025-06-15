import type { ServiceApiEnv } from "../ServiceApiEnv.js";
export async function reprocessAllBooks(env: ServiceApiEnv) {
    await env.tables.book_queue.copyFrom("books", false);
}
