import type { BookMeta, ProcessedBook } from "./book_types.js";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
export async function doProcessBook(env: ServiceApiEnv, bookMeta: BookMeta, body: string): Promise<ProcessedBook> {
    // TODO Вызывает LLM, которая находит сцены внутри книги и возвращает их в виде
    // TODO Возвращает нарезанные сцены
    throw new Error(`CODE00000008 reprocessBookScenes @notImplemented`);
}
