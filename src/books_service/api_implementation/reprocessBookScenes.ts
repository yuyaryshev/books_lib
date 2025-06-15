import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { reprocessBookScenesApi } from "../../api/index.js";
import { reprocessBookScenes } from "../book_analysing/index.js";
export function reprocessBookScenesApiImpl(env: ServiceApiEnv) {
  implementHttpExpressApi(env.apiRoot, reprocessBookScenesApi, async (req: typeof reprocessBookScenesApi.request): Promise<typeof reprocessBookScenesApi.response> => {
    await reprocessBookScenes(env, req.book_ids);
    const r: typeof reprocessBookScenesApi.response = {};
    return r;
  });
}