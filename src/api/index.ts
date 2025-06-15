import { AxiosInstance } from "axios";
import { httpApiFunction } from "yhttp_api";
import { getBookApi } from "./getBookApi.js";
import { searchBooksApi } from "./searchBooksApi.js";
import { setBookMetaApi } from "./setBookMetaApi.js";
import { setBookApi } from "./setBookApi.js";
import { getLastBooksApi } from "./getLastBooksApi.js";
import { setLastBooksApi } from "./setLastBooksApi.js";
import { getVersionApi } from "./getVersionApi";
import { currentVersion } from "../books_service/api_implementation";

// @INPRINT_START {exclude:["projmeta"]}
export * from "./getBookApi.js";
export * from "./getLastBooksApi.js";
export * from "./getVersionApi.js";
export * from "./searchBooksApi.js";
export * from "./setBookApi.js";
export * from "./setBookMetaApi.js";
export * from "./setLastBooksApi.js";
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
  const opts = {
    ...defaultCallerUrlOpts,
    ...opts0,
  };
  return (
    opts.baseUrl ||
    `${opts.protocol}://${opts.host}:${opts.port}${opts.virtualFolder}`
  );
}
export function makeApiCaller(axiosInstance: AxiosInstance) {
  const r = {
    getVersion: httpApiFunction(axiosInstance, getVersionApi),
    checkVersion: async () => {
      try {
        const response = await r.getVersion({});
        if (!response.version || response.version !== currentVersion) {
          throw new Error(
            `CODE00000005 Client/server version mismatch! clientVersion=${currentVersion}, serverVersion=${
              response.version || "undefined"
            }`
          );
        }
      } catch (e: any) {
        const msg = `CODE00000006 Check connection failed! Inner error: ${e.stack}`;
        console.error(msg);
        throw new Error(msg);
      }
    },
    getBook: httpApiFunction(axiosInstance, getBookApi),
    setBookMeta: httpApiFunction(axiosInstance, setBookMetaApi),
    setBook: httpApiFunction(axiosInstance, setBookApi),
    searchBooks: httpApiFunction(axiosInstance, searchBooksApi),
    getLastBooks: httpApiFunction(axiosInstance, getLastBooksApi),
    setLastBooks: httpApiFunction(axiosInstance, setLastBooksApi),
  };
  return r;
}
export type ApiCaller = ReturnType<typeof makeApiCaller>;
