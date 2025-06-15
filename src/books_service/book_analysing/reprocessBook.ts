import { BookId, BookMetadata, BookMetadata_fromRow } from "../../types/index.js";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { BOOKS_PROCESSING_BATCH } from "../../server/constants.js";
import { doProcessBook } from "./doProcessBook.js";
import { BookSceneId } from "./book_types.js";
import { reprocessBookScenes } from "./reprocessBookScenes.js";
export async function reprocessBook(env: ServiceApiEnv, bookIds0?: BookId[] | undefined) {
  const bookIds = bookIds0 !== undefined ? bookIds0 : (await env.tables.book_queue.select().limit(BOOKS_PROCESSING_BATCH)).map(row => row.book_id);
  for (let book_id of bookIds) {
    const bookRow = await env.tables.books.getById(book_id);
    const bookBodyRow = await env.tables.book_bodies.getById(book_id);
    if (!bookRow) {
      throw new Error(`CODE00000020 BookId = ${book_id} - not found!`);
    }
    const bookMeta: BookMetadata = BookMetadata_fromRow(bookRow);
    const body = bookBodyRow?.body || `BOOK_BODY_NOT_FOUND bookId=${book_id}`;
    const processedBook = await doProcessBook(env, bookMeta, body);
    for (let rawScene of processedBook.scenes) {
      await env.tables.book_scenes.knexTable().where({
        book_id
      }).del();
      await env.tables.book_scene_traits.knexTable().where({
        book_id
      }).del();
      const sceneId = env.tables.book_scenes.idManager.newId();
      const scene = {
        ...rawScene,
        bookId: book_id,
        id: sceneId
      };
      await env.tables.book_scenes.knexTable().insert(scene);
      await env.tables.book_scene_queue.upsert({
        book_id,
        book_scene_id: sceneId
      });
    }
    await env.tables.book_queue.remove({
      book_id
    });
    await reprocessBookScenes(env, [book_id]);
  }
}