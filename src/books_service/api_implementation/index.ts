import type { ServiceApiEnv } from "../ServiceApiEnv";
export type GenericApiImpl = (env: ServiceApiEnv) => void;

// @INPRINT_START {exclude:[""], merge:[{name:"apiImpls:GenericApiImpl[]", suffix:"ApiImpl", asObject:false}]}
export * from "./getBook.js";
export * from "./getLastBooks.js";
export * from "./getVersion.js";
export * from "./reprocessBookScenes.js";
export * from "./reprocessBooks.js";
export * from "./searchBooks.js";
export * from "./setBook.js";
export * from "./setBookMeta.js";
export * from "./setLastBooks.js";
export * from "./traitsFromJson.js";

import { getBookApiImpl } from "./getBook.js";
import { getLastBooksApiImpl } from "./getLastBooks.js";
import { getVersionApiImpl } from "./getVersion.js";
import { reprocessBookScenesApiImpl } from "./reprocessBookScenes.js";
import { reprocessBooksApiImpl } from "./reprocessBooks.js";
import { searchBooksApiImpl } from "./searchBooks.js";
import { setBookApiImpl } from "./setBook.js";
import { setBookMetaApiImpl } from "./setBookMeta.js";
import { setLastBooksApiImpl } from "./setLastBooks.js";
import { traitsFromJsonApiImpl } from "./traitsFromJson.js";
export const apiImpls: GenericApiImpl[] = [
  getBookApiImpl,
  getLastBooksApiImpl,
  getVersionApiImpl,
  reprocessBookScenesApiImpl,
  reprocessBooksApiImpl,
  searchBooksApiImpl,
  setBookApiImpl,
  setBookMetaApiImpl,
  setLastBooksApiImpl,
  traitsFromJsonApiImpl,
];
// @INPRINT_END

export function publishApis(env: ServiceApiEnv) {
  for (const apiImpl of apiImpls) {
    apiImpl(env);
  }
}
