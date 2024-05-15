import { expectDeepEqual } from "ystd";
import axios from "axios";
import { makeApiCaller, makeCallerUrl, getLastBooksApi, setLastBooksApi } from "../../api/index.js";
import type { BookLibServerSettings } from "../settings";
import { initBooksLibService } from "../books_service.js";
const port = 7340;
const makeTestServiceOpts: (portOffset: number) => BookLibServerSettings = (portOffset: number) => {
  const actualPort = port + portOffset;
  return {
    upsertTestData: true,
    port: actualPort,
    virtualFolder: "/otherApi/",
    baseUrl: `http://localhost:${actualPort}/otherApi/`,
    db: {
      recreateSchema: false,
      createTestData: false,
      client: "better-sqlite3",
      connection: {
        filename: ":memory:"
        // filename: "./ylog_server.db",
      }
    },
    book_bodies_db: {
      recreateSchema: false,
      createTestData: false,
      client: "better-sqlite3",
      connection: {
        filename: ":memory:"
        // filename: "./ylog_server.db",
      }
    },
    authStorage: {
      path: ":memory:"
    }
  };
};
describe("books_lib/getLastBooks.test.ts", () => {
  it("getLastBooksApi - request1", async function () {
    const testServiceOpts = makeTestServiceOpts(1);
    const booksLibService = initBooksLibService(testServiceOpts);
    try {
      await booksLibService.start();
      const axiosOpts = {
        baseURL: makeCallerUrl(testServiceOpts)
      };
      const axiosInstance = axios.create(axiosOpts);
      const apiCaller = makeApiCaller(axiosInstance);
      {
        const request: typeof setLastBooksApi.request = {
          lastBooks: ["1002"]
        };
        const response = await apiCaller.setLastBooks(request);
        expectDeepEqual(response, {});
      }
      {
        const request: typeof getLastBooksApi.request = {
          unused: undefined
        };
        const response = await apiCaller.getLastBooks(request);
        expectDeepEqual(response, {
          lastBooks: [{
            metadata: {
              id: "BookId",
              name: "book name here",
              author: "author here",
              myMark: 3,
              tags: ["tag1", "tag2"]
            },
            highlights: "Test book body"
          }]
        });
      }
      //        } catch (e: any) {
      //            throw e;
    } finally {
      booksLibService?.stop();
    }
  });
});