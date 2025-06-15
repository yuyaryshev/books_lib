import { expectDeepEqual } from "ystd";
import axios from "axios";
import { makeApiCaller, makeCallerUrl, searchBooksApi } from "../../api/index.js";
import type { BookLibServerSettings } from "../settings";
import { initBooksLibService } from "../books_service.js";
const port = 7342;
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
describe("books_lib/searchBooks.test.ts", () => {
  it("searchBooks - request1", async function () {
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
        const request: typeof searchBooksApi.request = {
          queryStr: "1002"
        };
        const response = await apiCaller.searchBooks(request);
        expectDeepEqual(response, {
          results: [{
            metadata: {
              id: 1002,
              url: "http://book1002 name",
              externalBookId: "book1002 name",
              name: "book1002 name",
              sourceSite: "testData",
              author: "book1002 author",
              myMark: 4,
              tags: ["tag1", "tag3"]
            },
            highlights: "name:book<b>1002</b> name\nbook body 02"
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