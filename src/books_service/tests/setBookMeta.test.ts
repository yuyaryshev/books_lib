import { expectDeepEqual } from "ystd";
import axios from "axios";
import { makeApiCaller, makeCallerUrl, setBookMetaApi } from "../../api/index.js";
import { BooksLibServiceOpts, initBooksLibService } from "../books_service.js";

const port = 7346;
const makeTestServiceOpts: (portOffset: number) => BooksLibServiceOpts = (portOffset: number) => {
    const actualPort = port + portOffset;
    return {
        port: actualPort,
        virtualFolder: "/otherApi/",
        baseUrl: `http://localhost:${actualPort}/otherApi/`,
    };
};

describe("rsm_checks_module/validation_service/tests/setBookMeta.test.ts", () => {
    it("setBookMeta - request1", async function () {
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
                const request: typeof setBookMetaApi.request = {
                    metadata: {
                        id: "BookId",
                        name: "book name here",
                        author: "author here",
                        myMark: 3,
                        tags: ["tag1", "tag3"],
                    },
                };

                const response = await apiCaller.setBookMeta(request);
                expectDeepEqual(response, {});
            }

            {
                const response = await apiCaller.getBook({ bookId: "BookId", bodyRequest: "preview" });
                expectDeepEqual(response, {
                    metadata: {
                        id: "BookId",
                        name: "book name here",
                        author: "author here",
                        myMark: 3,
                        tags: ["tag1", "tag3"],
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
