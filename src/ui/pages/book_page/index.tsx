import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import { getBookApi } from "../../../api";
import { expectDeepEqual } from "ystd";
import { useApiCaller } from "../../app/booksLibApiCaller";

export function BookPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [bookContent, setBookContent] = useState("");
    const { bookId } = useParams(); // Get bookId from URL params

    useEffect(() => {
        (async () => {
            try {
                const apiCaller = useApiCaller();
                const request: typeof getBookApi.request = {
                    bookId: bookId!, // Use bookId from URL params
                    bodyRequest: "preview",
                };
                const response = await apiCaller.getBook(request);
                setBookContent(response.body);
                setIsLoading(false);
            } catch (e: any) {
                console.error(`CODE00000000 Loading book failed!`);
                console.error(e.stack);
                setBookContent(e.stack);
                setIsLoading(false);
            }
        })();
    }, [bookId]); // Add bookId to dependency array

    return <div>{isLoading ? "Loading..." : bookContent}</div>;
}
