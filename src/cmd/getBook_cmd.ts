import { initBooksLibService } from "../books_service/books_service";
import { getBookApi, makeApiCaller, makeCallerUrl } from "../api";
import axios from "axios";
import { expectDeepEqual } from "ystd";
import { getCachedServerSettings } from "../books_service/settings";

export async function getBook_cmd() {
    try {
        const testServiceOpts = getCachedServerSettings("settings.json5");
        const axiosOpts = {
            baseURL: `http://localhost:5173/api/`, // makeCallerUrl(testServiceOpts),
        };
        const axiosInstance = axios.create(axiosOpts);
        const apiCaller = makeApiCaller(axiosInstance);
        {
            const request: typeof getBookApi.request = {
                bookId: "1002",
                bodyRequest: "preview",
            };
            const response = await apiCaller.getBook(request);
            expectDeepEqual(response, {
                metadata: {
                    id: 1002,
                    name: "book1002 name",
                    author: "book1002 author",
                    myMark: 4,
                    tags: ["tag1", "tag3"],
                },
                body: "book body 02",
            });
        }
        console.log("CODE000000 getBook_cmd.ts - test successful!");
    } catch (e: any) {
        console.error("CODE000000 getBook_cmd.ts - test FAILED!");
        console.error(e.stack);
    }
}

getBook_cmd().then();
