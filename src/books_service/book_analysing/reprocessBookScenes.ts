import type { BookId } from "../../types/index.js";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
export async function reprocessBookScenes(env: ServiceApiEnv, bookIds: BookId[]) {
    // TODO Если задан параметр - берет их
    // TODO Иначе - загружает несколько первых id из book_scene_queue
    // TODO Обходит циклом эти id
    // TODO Загружает по одной тесты сцен
    // TODO Вызывает process_book_scene
    throw new Error(`CODE00000014 reprocessBookScenes @notImplemented`);
}
