import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { traitsFromJsonApi } from "../../api/index.js";
import { BookMetadata, BookMetadata_fromRow } from "../../types/index.js";
export function traitsFromJsonApiImpl(env: ServiceApiEnv) {
  implementHttpExpressApi(env.apiRoot, traitsFromJsonApi, async (req: typeof traitsFromJsonApi.request): Promise<typeof traitsFromJsonApi.response> => {
    await env.tables.book_scene_traits.updateFromJson();
    const r: typeof traitsFromJsonApi.response = {};
    return r;
  });
}