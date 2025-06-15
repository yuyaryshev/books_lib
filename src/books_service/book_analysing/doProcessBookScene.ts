import type { BookSceneRaw, ProcessedBookScene } from "./book_types.js";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
export async function doProcessBookScene(env: ServiceApiEnv, bookScene: BookSceneRaw): Promise<ProcessedBookScene> {
  // TODO Вызывает LLM, которая анализирует сцену, получая данные из нее
  // TODO Возвращает метаданные
  throw new Error(`CODE00000009 doProcessBookScene @notImplemented`);
}