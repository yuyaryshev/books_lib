import type { ServiceApiEnv } from "../ServiceApiEnv";

export type GenericApiImpl = (env: ServiceApiEnv) => void;

// @INPRINT_START {exclude:[""], merge:[{name:"apiImpls:GenericApiImpl[]", suffix:"ApiImpl", asObject:false}]}
export * from "./getBook.js";
export * from "./getLastBooks.js";
export * from "./searchBooks.js";
export * from "./setBookBody.js";
export * from "./setBookMeta.js";
export * from "./setLastBooks.js";

import { getBookApiImpl } from "./getBook.js";
import { getLastBooksApiImpl } from "./getLastBooks.js";
import { searchBooksApiImpl } from "./searchBooks.js";
import { setBookBodyApiImpl } from "./setBookBody.js";
import { setBookMetaApiImpl } from "./setBookMeta.js";
import { setLastBooksApiImpl } from "./setLastBooks.js";
export const apiImpls: GenericApiImpl[] = [
  getBookApiImpl,
  getLastBooksApiImpl,
  searchBooksApiImpl,
  setBookBodyApiImpl,
  setBookMetaApiImpl,
  setLastBooksApiImpl,
];
// @INPRINT_END

export function publishApis(env: ServiceApiEnv) {
  for (const apiImpl of apiImpls) {
    apiImpl(env);
  }
}
