import { expectDeepEqual } from "ystd";
import axios from "axios";
import { makeApiCaller, makeCallerUrl, setBookMetaApi } from "../../api/index.js";
import type { BookLibServerSettings } from "../settings";
import { initBooksLibService } from "../books_service.js";
const port = 7346;
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
describe("books_lib/setBookMeta.test.ts", () => {
  it("setBookMeta - request1", async function () {
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
        const request: typeof setBookMetaApi.request = {
          metadata: {
            id: "BookId",
            name: "book name here",
            author: "author here",
            myMark: 3,
            tags: ["tag1", "tag3"]
          }
        };
        const response = await apiCaller.setBookMeta(request);
        expectDeepEqual(response, {});
      }
      {
        const response = await apiCaller.getBook({
          bookId: "BookId",
          bodyRequest: "preview"
        });
        expectDeepEqual(response, {
          metadata: {
            id: "BookId",
            name: "book name here",
            author: "author here",
            myMark: 3,
            tags: ["tag1", "tag3"]
          },
          body: "BOOK_BODY_NOT_FOUND bookId=BookId"
        });
      }
      //        } catch (e: any) {
      //            throw e;
    } finally {
      booksLibService?.stop();
    }
  });
});