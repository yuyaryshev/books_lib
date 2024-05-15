import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.js";
import { theme } from "./app/theme.js";
import "open-color/open-color.css";
import "normalize.css";
import "./index.css";
import { makeBooksLibApiCaller } from "./app/booksLibApiCaller";

const app = document.getElementById("app")!;
const root = createRoot(app);

makeBooksLibApiCaller();

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
