import { expectDeepEqual } from "ystd";
import axios from "axios";
import { makeApiCaller, makeCallerUrl, getBookApi } from "../../api/index.js";
import { BooksLibServiceOpts, initBooksLibService } from "../books_service.js";

const port = 7340;
const makeTestServiceOpts: (portOffset: number) => BooksLibServiceOpts = (portOffset: number) => {
    const actualPort = port + portOffset;
    return {
        port: actualPort,
        virtualFolder: "/otherApi/",
        baseUrl: `http://localhost:${actualPort}/otherApi/`,
    };
};

describe("rsm_checks_module/validation_service/tests/getBook.test.ts", () => {
    it("getBookApi - request1", async function () {
        const testServiceOpts = makeTestServiceOpts(1);
        const validationService = initBooksLibService(testServiceOpts);

        try {
            await validationService.start();
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
            validationService?.stop();
        }
    });
});
