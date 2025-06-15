import type { ServiceApiEnv } from "../ServiceApiEnv";

export type GenericApiImpl = (env: ServiceApiEnv) => void;

// @INPRINT_START {exclude:[""], merge:[{name:"apiImpls:GenericApiImpl[]", suffix:"ApiImpl", asObject:false}]}
export * from "./getBook.js";
export * from "./getLastBooks.js";
export * from "./getVersion.js";
export * from "./searchBooks.js";
export * from "./setBook.js";
export * from "./setBookMeta.js";
export * from "./setLastBooks.js";

import { getBookApiImpl } from "./getBook.js";
import { getLastBooksApiImpl } from "./getLastBooks.js";
import { getVersionApiImpl } from "./getVersion.js";
import { searchBooksApiImpl } from "./searchBooks.js";
import { setBookApiImpl } from "./setBook.js";
import { setBookMetaApiImpl } from "./setBookMeta.js";
import { setLastBooksApiImpl } from "./setLastBooks.js";

export const apiImpls: GenericApiImpl[] = [
    getBookApiImpl,
    getLastBooksApiImpl,
    getVersionApiImpl,
    searchBooksApiImpl,
    setBookApiImpl,
    setBookMetaApiImpl,
    setLastBooksApiImpl,
];

// @INPRINT_END

export function publishApis(env: ServiceApiEnv) {
    for (const apiImpl of apiImpls) {
        apiImpl(env);
    }
}
