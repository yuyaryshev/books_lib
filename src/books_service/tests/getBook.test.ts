import { expectDeepEqual } from "ystd";
import axios from "axios";
import { makeApiCaller, makeCallerUrl, getBookApi } from "../../api/index.js";
import type { BookLibServerSettings } from "../settings";
import { initBooksLibService } from "../books_service.js";

const port = 7340;
const makeTestServiceOpts: (portOffset: number) => BookLibServerSettings = (portOffset: number) => {
    const actualPort = port + portOffset;
    return {
        port: actualPort,
        virtualFolder: "/otherApi/",
        baseUrl: `http://localhost:${actualPort}/otherApi/`,
        db: {
            recreateSchema: false,
            createTestData: false,
            client: "better-sqlite3",
            connection: {
                filename: ":memory:",
                // filename: "./ylog_server.db",
            },
        },
        authStorage: {
            path: ":memory:",
        },
    };
};

describe("rsm_checks_module/validation_service/tests/getBook.test.ts", () => {
    it("getBookApi - request1", async function () {
        const testServiceOpts = makeTestServiceOpts(1);
        const booksLibService = initBooksLibService(testServiceOpts);

        try {
            await booksLibService.start();
            const axiosOpts = {
                baseURL: makeCallerUrl(testServiceOpts),
            };
            const axiosInstance = axios.create(axiosOpts);

            const apiCaller = makeApiCaller(axiosInstance);

            {
                const request: typeof getBookApi.request = {
                    bookId: "book1",
                    bodyRequest: "preview",
                };

                const response = await apiCaller.getBook(request);
                expectDeepEqual(response, {
                    metadata: {
                        id: "BookId",
                        name: "book name here",
                        author: "author here",
                        myMark: 3,
                        tags: ["tag1", "tag2"],
                    },
                    body: "Test book body",
                });
            }
            //        } catch (e: any) {
            //            throw e;
        } finally {
            booksLibService?.stop();
        }
    });
});
