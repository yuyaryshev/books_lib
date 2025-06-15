import { expectDeepEqual } from "ystd";
import axios from "axios";
import { makeApiCaller, makeCallerUrl, reprocessBookScenesApi } from "../../api/index.js";
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
describe("books_lib/reprocessBookScenes.test.ts", () => {
  it("reprocessBookScenesApi - request1", async function () {
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
        const request: typeof reprocessBookScenesApi.request = {
          book_ids: ["1002"]
        };
        const response = await apiCaller.reprocessBookScenes(request);
        expectDeepEqual(response, {});
      }
    } finally {
      booksLibService?.stop();
    }
  });
});