import { expectDeepEqual } from "ystd";
import axios from "axios";
import { makeApiCaller, makeCallerUrl, searchBooksApi } from "../../api/index.js";
import { BooksLibServiceOpts, initBooksLibService } from "../books_service.js";

const port = 7342;
const makeTestServiceOpts: (portOffset: number) => BooksLibServiceOpts = (portOffset: number) => {
    const actualPort = port + portOffset;
    return {
        port: actualPort,
        virtualFolder: "/otherApi/",
        baseUrl: `http://localhost:${actualPort}/otherApi/`,
    };
};

describe("rsm_checks_module/validation_service/tests/searchBooks.test.ts", () => {
    it("searchBooks - request1", async function () {
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
                const request: typeof searchBooksApi.request = {
                    queryStr: "here",
                };

                const response = await apiCaller.searchBooks(request);
                expectDeepEqual(response, {
                    results: [
                        {
                            metadata: {
                                id: "BookId",
                                name: "book name here",
                                author: "author here",
                                myMark: 3,
                                tags: ["tag1", "tag2"],
                            },
                            highlights: `highlights here`,
                        },
                    ],
                });
            }
            //        } catch (e: any) {
            //            throw e;
        } finally {
            validationService?.stop();
        }
    });
});
