import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/home/index.js";
import { TestPage } from "../pages/test_page/index.js";
import { BookPage } from "../pages/book_page/index.js";
import { SearchPage } from "../pages/search_page";

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/test_page",
        element: <TestPage />,
    },
    {
        path: "/search",
        element: <SearchPage />,
    },
    {
        path: "/book/:bookId",
        element: <BookPage />,
    },
]);

// {
//     path: '/login',
//     element: <LoginPage />,
// },
// {
//     path: '/ide',
//     element: <IdePage />,
//     children: [
//         {
//             index: true,
//             element: <Navigate to="/ide/code" />,
//         },
//         {
//             path: 'code',
//             element: <CodePage />,
//         },
//         {
//             path: 'tasks',
//             element: <TasksPage />,
//         },
//     ],
// },
// {
//     path: '/showcase',
//     element: <ShowcasePage />,
// },
