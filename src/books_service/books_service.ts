import express from "express";
import { ApiRoot } from "yhttp_api_express";
import { serverStartupAutotests } from "./serverStartupAutotests.js";
import { CallerUrlOpts } from "../api/index.js";
import { a } from "vite/dist/node/types.d-jgA8ss1A";
import { ServiceApiEnv } from "./ServiceApiEnv.js";
import { publishApis } from "./api_implementation/index.js";
import { YHttpResponse } from "yhttp_api_express/src/implementerLib";

export const defaultValidationServiceOpts = {
    virtualFolder: "/api/",
};

export interface ValidationServiceOpts0 extends CallerUrlOpts {
    port: number;
    baseUrl: string;
    virtualFolder?: string;
}

export interface BooksLibServiceOpts extends CallerUrlOpts {
    port: number;
    baseUrl: string;
    virtualFolder: string;
}

export interface ValidationService {
    start: () => Promise<void> | void;
    stop: () => Promise<void> | void;
}

export function initBooksLibService(opts0: ValidationServiceOpts0) {
    const opts: BooksLibServiceOpts = { ...defaultValidationServiceOpts, ...opts0 };

    const httpServerApp = express();
    httpServerApp.use(express.json());

    async function onExceptionHandler(req: any, res: any, e: any, response: YHttpResponse) {
        const r: any = {
            errorCode: "VE9003",
            additionalMessage: `CODE00000000 Error on server while handling request. Error stack: ${e.stack}`,
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

    let runningInstance: any;

    async function start() {
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
