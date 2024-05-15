import express from "express";
import { ApiRoot } from "yhttp_api_express";
import { serverStartupAutotests } from "./serverStartupAutotests.js";
import { CallerUrlOpts } from "../api/index.js";
import { ServiceApiEnv } from "./ServiceApiEnv.js";
import { publishApis } from "./api_implementation/index.js";
import { YHttpResponse } from "yhttp_api_express/src/implementerLib";
import { ServiceDbEnv } from "./ServiceDbEnv.js";
import { initTables } from "./db/index.js";
import knexLib, { Knex } from "knex";
import { BookLibServerSettings, defaultBookLibServerSettings } from "./settings.js";
import { deepEqual } from "ystd";
import { createTablesIfNotExist, upsertTestData } from "./db/db_generics/SchemaFuncs.js";
export interface BooksLibService {
    start: () => Promise<void> | void;
    stop: () => Promise<void> | void;
}
export function initBooksLibService(opts0: BookLibServerSettings) {
    const opts: BookLibServerSettings = {
        ...defaultBookLibServerSettings,
        ...opts0,
    };
    let runningInstance: any;
    async function start() {
        const env0 = {};
        const knex = Object.assign(
            knexLib({
                ...opts.db,
                useNullAsDefault: true,
            }),
            {
                id: "main",
                settings: opts.db,
            },
        );
        const bodies_in_same_db = deepEqual(opts.book_bodies_db, opts.db);
        const book_bodies_knex = bodies_in_same_db
            ? knex
            : Object.assign(
                  knexLib({
                      ...opts.book_bodies_db,
                      useNullAsDefault: true,
                  }),
                  {
                      id: "bodies_db",
                      settings: opts.book_bodies_db,
                  },
              );
        const dbEnv: ServiceDbEnv = Object.assign(env0, {
            knex,
            book_bodies_knex,
        });
        const tables = await initTables(dbEnv);
        await createTablesIfNotExist(tables);
        if (opts.upsertTestData) {
            await upsertTestData(tables);
        }
        const envWithTables = Object.assign(dbEnv, {
            tables,
        });
        const httpServerApp = express();
        httpServerApp.use(express.json());
        async function onExceptionHandler(req: any, res: any, e: any, response: YHttpResponse) {
            return {
                error: e.stack,
            };
        }
        const apiRoot: ApiRoot = {
            httpServerApp,
            virtualFolder: opts.virtualFolder,
            onExceptionHandler,
        };
        const apiPrereq: ServiceApiEnv = Object.assign(dbEnv, {
            apiRoot,
            tables,
        });
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
    return {
        start,
        stop,
    };
}
