import { array, boolean, Decoder, number, object, optional, string } from "yuyaryshev-json-type-validation";
import { BookId, decoderBookId } from "./BookId.js";
import { BookRowT } from "../books_service/db/index.js";
import JSON5 from "json5";
import { decoderExternalBookId, ExternalBookId } from "../books_service/book_analysing/index.js";
import { deleteNulls } from "../books_service/db/db_generics/BaseTable.js";

export interface BookMetadata {
    id: BookId;
    url: string;
    externalBookId: ExternalBookId;
    name: string;
    description?: string;
    sourceSite: string;
    author: string;
    myMark: number;
    tags: string[];
    deletedFlag?: boolean;
}

export const decoderBookMetadata: Decoder<BookMetadata> = object({
    id: decoderBookId,
    url: string(),
    externalBookId: decoderExternalBookId,
    name: string(),
    description: optional(string()),
    sourceSite: string(),
    author: string(),
    myMark: number(),
    tags: array(string()),
    deletedFlag: optional(boolean()),
});

export function BookMetadata_fromRow(v: BookRowT): BookMetadata {
    const tags = JSON5.parse(v.tags);
    return deleteNulls({
        ...v,
        tags,
    });
}

export function BookMetadata_toRow(v: BookMetadata): BookRowT {
    const tags = JSON5.stringify(v.tags);
    // const description: string | undefined = v.description?.trim()?.length ? v.description.trim() : undefined;
    return {
        ...v,
        tags,
    };
}
