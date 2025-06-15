import { expectDeepEqual } from "ystd";
import axios from "axios";
import { getBookApi, makeApiCaller, makeCallerUrl, setBookApi } from "../../api/index.js";
import type { BookLibServerSettings } from "../settings";
import { initBooksLibService } from "../books_service.js";

const port = 7344;
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
                filename: ":memory:",
                // filename: "./ylog_server.db",
            },
        },
        book_bodies_db: {
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

describe("books_lib/setBook.test.ts", () => {
    it("setBook - request1", async function () {
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
                const request: typeof setBookApi.request = {
                    bookId: "1002",
                    body: "New book body",
                    metadata: undefined,
                };
                const response = await apiCaller.setBook(request);
                expectDeepEqual(response, {});
            }
            {
                const request: typeof getBookApi.request = {
                    bookId: "1002",
                    bodyRequest: "preview",
                };
                const response = await apiCaller.getBook(request);
                expectDeepEqual(response, {
                    metadata: {
                        id: 1002,
                        url: "http://book1002 name",
                        externalBookId: "book1002 name",
                        name: "book1002 name",
                        sourceSite: "testData",
                        author: "book1002 author",
                        myMark: 4,
                        tags: ["tag1", "tag3"],
                    },
                    body: "New book body",
                });
            }
            //        } catch (e: any) {
            //            throw e;
        } finally {
            booksLibService?.stop();
        }
    });
});
