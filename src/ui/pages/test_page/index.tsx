import React, { useEffect, useState } from "react";
import { getBookApi } from "../../../api";
import { useApiCaller } from "../../app/booksLibApiCaller";

export function TestPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [bookContent, setBookContent] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const apiCaller = useApiCaller();
                const request: typeof getBookApi.request = {
                    bookId: "1002",
                    bodyRequest: "preview",
                };
                const response = await apiCaller.getBook(request);
                setBookContent(response.body);
                setIsLoading(false);
            } catch (e: any) {
                console.error(`CODE00000000 Loading book failed!`);
                console.error(e.stack);
                setIsLoading(false);
            }
        })();
    }, []);

    return <div>{isLoading ? "Loading..." : bookContent}</div>;
}

//
// expectDeepEqual(response, {
//     metadata: {
//         id: 1002,
//         name: "book1002 name",
//         author: "book1002 author",
//         myMark: 4,
//         tags: ["tag1", "tag3"],
//     },
//     body: "book body 02",
// });
