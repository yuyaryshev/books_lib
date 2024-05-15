import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { getVersionApi } from "../../api/index.js";

export function getVersionApiImpl(env: ServiceApiEnv) {
    implementHttpExpressApi(env.apiRoot, getVersionApi, async (req: typeof getVersionApi.request): Promise<typeof getVersionApi.response> => {
        return { version: 100, ts: new Date().toISOString() };
    });
}
