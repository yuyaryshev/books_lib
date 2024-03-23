import type { ServiceApiEnv } from "../ServiceApiEnv";
import { ServiceDbEnv } from "../ServiceDbEnv.js";
//import type { RemovePromise } from "ystd";
export type RemovePromise<T> = T extends Promise<infer T2> ? T2 : T;

// @INPRINT_START {exclude:[""], merge:[{suffix:"Table", definitionStr:"export async function initTables(dbEnv: ServiceDbEnv) {\n  return {\n    ITEMS\n  }\n}", itemStr:"FILE:new VAR(dbEnv)"}]}
export * from "./book_bodies.js";
export * from "./books.js";

import { book_bodiesTable } from "./book_bodies.js";
import { booksTable } from "./books.js";
export async function initTables(dbEnv: ServiceDbEnv) {
  return {
    book_bodies: new book_bodiesTable(dbEnv),
    books: new booksTable(dbEnv),
  };
}
// @INPRINT_END

export type TablesAndViews = RemovePromise<ReturnType<typeof initTables>>;
