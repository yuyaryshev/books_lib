import { ServiceDbEnv } from "../ServiceDbEnv.js";
//import type { RemovePromise } from "ystd";
export type RemovePromise<T> = T extends Promise<infer T2> ? T2 : T;

// @INPRINT_START {exclude:[""], merge:[{suffix:"Table", definitionStr:"export async function initTables(dbEnv: ServiceDbEnv) {\n  return {\n    ITEMS\n  }\n}", itemStr:"FILE:new VAR(dbEnv)"}]}
export * from "./book_bodies.js";
export * from "./book_queue.js";
export * from "./book_scene_queue.js";
export * from "./book_scene_traits.js";
export * from "./book_scenes.js";
export * from "./books.js";
export * from "./books_last.js";

import { book_bodiesTable } from "./book_bodies.js";
import { book_queueTable } from "./book_queue.js";
import { book_scene_queueTable } from "./book_scene_queue.js";
import { book_scene_traitsTable } from "./book_scene_traits.js";
import { book_scenesTable } from "./book_scenes.js";
import { booksTable } from "./books.js";
import { books_lastTable } from "./books_last.js";
export async function initTables(dbEnv: ServiceDbEnv) {
  return {
    book_bodies: new book_bodiesTable(dbEnv),
    book_queue: new book_queueTable(dbEnv),
    book_scene_queue: new book_scene_queueTable(dbEnv),
    book_scene_traits: new book_scene_traitsTable(dbEnv),
    book_scenes: new book_scenesTable(dbEnv),
    books: new booksTable(dbEnv),
    books_last: new books_lastTable(dbEnv),
  };
}
// @INPRINT_END

export type TablesAndViews = RemovePromise<ReturnType<typeof initTables>>;
