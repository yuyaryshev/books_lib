import { httpApiDefinition, httpApiFunction } from "yhttp_api";
import { object, string, number, array, anyJson } from "yuyaryshev-json-type-validation";
import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { setBookBodyApi } from "../../api/index.js";
import { BookId, BookMetadata, decoderBookMetadata } from "../../types/index.js";
import { BookBodyRowT } from "../db/index.js";
export function setBookBodyApiImpl(env: ServiceApiEnv) {
  implementHttpExpressApi(env.apiRoot, setBookBodyApi, async (req: typeof setBookBodyApi.request): Promise<typeof setBookBodyApi.response> => {
    const bookBodyRow: BookBodyRowT = {
      id: req.bookId,
      body: req.body
    };
    await env.tables.book_bodies.upsertById(bookBodyRow);
    return {};
  });
}