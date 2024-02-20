import { AxiosInstance } from "axios";
import { httpApiFunction } from "yhttp_api";
import { getBookApi } from "./getBookApi.js";
import { searchBooksApi } from "./searchBooksApi.js";
import { setBookMetaApi } from "./setBookMetaApi.js";
import { setBookBodyApi } from "./setBookBodyApi.js";
import { getLastBooksApi } from "./getLastBooks.js";
import { setLastBooksApi } from "./setLastBooks.js";

// @INPRINT_START {exclude:["projmeta"]}
export * from "./getBookApi.js";
export * from "./getLastBooks.js";
export * from "./searchBooksApi.js";
export * from "./setBookBodyApi.js";
export * from "./setBookMetaApi.js";
export * from "./setLastBooks.js";
// @INPRINT_END

export const defaultCallerUrlOpts = {
  protocol: "http",
  virtualFolder: "/api/",
};

export interface CallerUrlOpts {
  protocol?: string;
  host?: string;
  port?: number;
  virtualFolder?: string;
  baseUrl?: string;
}

export function makeCallerUrl(opts0: CallerUrlOpts) {
  const opts = { ...defaultCallerUrlOpts, ...opts0 };
  return (
    opts.baseUrl ||
    `${opts.protocol}://${opts.host}:${opts.port}${opts.virtualFolder}`
  );
}

export function makeApiCaller(axiosInstance: AxiosInstance) {
  const r = {
    getBook: httpApiFunction(axiosInstance, getBookApi),
    setBookMeta: httpApiFunction(axiosInstance, setBookMetaApi),
    setBookBody: httpApiFunction(axiosInstance, setBookBodyApi),
    searchBooks: httpApiFunction(axiosInstance, searchBooksApi),
    getLastBooks: httpApiFunction(axiosInstance, getLastBooksApi),
    setLastBooks: httpApiFunction(axiosInstance, setLastBooksApi),
  };
  return r;
}

export type ApiCaller = ReturnType<typeof makeApiCaller>;
