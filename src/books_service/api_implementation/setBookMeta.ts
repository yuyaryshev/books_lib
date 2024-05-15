import { httpApiDefinition, httpApiFunction } from "yhttp_api";
import { object, string, number, array, anyJson } from "yuyaryshev-json-type-validation";
import { implementHttpExpressApi } from "yhttp_api_express";
import type { ServiceApiEnv } from "../ServiceApiEnv.js";
import { setBookMetaApi } from "../../api/index.js";
import { BookId, BookMetadata, BookMetadata_toRow, decoderBookMetadata } from "../../types/index.js";
import { BookBodyRowT } from "../db/index.js";
export function setBookMetaApiImpl(env: ServiceApiEnv) {
  implementHttpExpressApi(env.apiRoot, setBookMetaApi, async (req: typeof setBookMetaApi.request): Promise<typeof setBookMetaApi.response> => {
    // const bookRow = await env.tables.books.getById(req.bookId);
    // const bookBodyRow = await env.tables.book_bodies.getById(req.bookId);

    const bookRow = BookMetadata_toRow(req.metadata);
    await env.tables.books.upsertById(bookRow);
    return {};
  });
}