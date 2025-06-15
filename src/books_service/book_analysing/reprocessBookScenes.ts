import type { BookId } from "../../types/index.js";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { BOOK_SCENES_PROCESSING_BATCH, BOOKS_PROCESSING_BATCH } from "../../server/constants.js";
import { doProcessBookScene } from "./doProcessBookScene.js";
export async function reprocessBookScenes(env: ServiceApiEnv, bookIds0?: BookId[] | undefined) {
    // TODO add Api for reprocessBookScenes(bookIds) call
    // TODO add test for reprocessBookScenes(bookIds) call

    const bookIds =
        bookIds0 !== undefined
            ? bookIds0
            : (await env.tables.book_scene_queue.select().limit(BOOK_SCENES_PROCESSING_BATCH)).map((row) => row.book_id);

    for (let book_id of bookIds) {
        const sceneRows = await env.tables.book_scenes.select().where({ book_id });
        for (let sceneRow of sceneRows) {
            const book_scene_id = sceneRow.id;
            const bookSceneRaw = sceneRow;
            const processedScene = await doProcessBookScene(env, bookSceneRaw);

            const extractedColumns = await env.tables.book_scene_traits.extractFromJson(processedScene);
            const traitsRow = { ...extractedColumns, json: JSON.stringify(processedScene), id: book_scene_id, book_id };
            await env.tables.book_scene_traits.upsertById(traitsRow);

            await env.tables.book_scene_queue.remove({ book_id, book_scene_id });
        }
    }

    throw new Error(`CODE00000014 reprocessBookScenes @notImplemented`);
}
