import type { ProcessedBook } from "./book_types.js";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { BookMetadata } from "../../types/index.js";
export async function doProcessBook(env: ServiceApiEnv, bookMetadata: BookMetadata, body: string): Promise<ProcessedBook> {
  // TODO Вызывает LLM, которая находит сцены внутри книги и возвращает их в виде
  // TODO Возвращает нарезанные сцены
  throw new Error(`CODE00000008 doProcessBook @notImplemented`);
}