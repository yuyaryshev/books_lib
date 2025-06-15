import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { book_scenesTableDescriptor } from "../db/book_scenes.js";
export async function reprocessAllScenes(env: ServiceApiEnv) {
  await env.tables.book_queue.copyFrom(book_scenesTableDescriptor.tableName, false);
}