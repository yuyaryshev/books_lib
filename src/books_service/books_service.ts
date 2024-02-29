import express from "express";
import { ApiRoot } from "yhttp_api_express";
import { serverStartupAutotests } from "./serverStartupAutotests.js";
import { CallerUrlOpts } from "../api/index.js";
import { a } from "vite/dist/node/types.d-jgA8ss1A";
import { ServiceApiEnv } from "./ServiceApiEnv.js";
import { publishApis } from "./api_implementation/index.js";
import { YHttpResponse } from "yhttp_api_express/src/implementerLib";
import { ServiceDbEnv } from "./ServiceDbEnv.js";
import { initTables } from "./db/index.js";
import knexLib, { Knex } from "knex";
import { BookLibServerSettings, defaultBookLibServerSettings } from "./settings";

export interface BooksLibService {
    start: () => Promise<void> | void;
    stop: () => Promise<void> | void;
}

export function initBooksLibService(opts0: BookLibServerSettings) {
    const opts: BookLibServerSettings = { ...defaultBookLibServerSettings, ...opts0 };

    let runningInstance: any;

    async function start() {
        const env0 = {};
        const knex = Object.assign(knexLib({ ...opts.db, useNullAsDefault: true }), { id: "main", settings: opts.db });
        const dbEnv: ServiceDbEnv = Object.assign(env0, { knex });
        const tables = await initTables(dbEnv);
        const envWithTables = Object.assign(dbEnv, { tables });

        const httpServerApp = express();
        httpServerApp.use(express.json());

        async function onExceptionHandler(req: any, res: any, e: any, response: YHttpResponse) {
            const r: any = {
                errorCode: "VE9003",
                additionalMessage: `CODE00000002 Error on server while handling request. Error stack: ${e.stack}`,
            };
            return { errors: [r] };
        }

        const apiRoot: ApiRoot = {
            httpServerApp,
            virtualFolder: opts.virtualFolder,
            onExceptionHandler,
        };

        const apiPrereq: ServiceApiEnv = { apiRoot };
        publishApis(apiPrereq);

        runningInstance = httpServerApp.listen(opts.port, () => {
            console.log("CODE00001215", `Test server is listening on port ${opts.port}`);
        }) as any;
        await serverStartupAutotests(opts);
    }

    function stop() {
        if (runningInstance) {
            runningInstance.close(() => {
                console.log("CODE00001216", `Test server on port ${opts.port} is now offline.`);
            });
        }
    }

    return { start, stop };
}
