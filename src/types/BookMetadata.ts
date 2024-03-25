import { Decoder, object, string, number, array, anyJson, optional, boolean } from "yuyaryshev-json-type-validation";
import { BookId, decoderBookId } from "./BookId.js";
import { BookRowT } from "../books_service/db";
import JSON5 from "json5";

export interface BookMetadata {
    id: BookId;
    name: string;
    description?: string;
    author: string;
    myMark: number;
    tags: string[];
    deletedFlag?: boolean;
}

export const decoderBookMetadata: Decoder<BookMetadata> = object({
    id: decoderBookId,
    name: string(),
    description: optional(string()),
    author: string(),
    myMark: number(),
    tags: array(string()),
    deletedFlag: optional(boolean()),
});

export function BookMetadata_fromRow(v: BookRowT): BookMetadata {
    const tags = JSON5.parse(v.tags);
    return { ...v, tags };
}
export function BookMetadata_toRow(v: BookMetadata): BookRowT {
    const tags = JSON5.stringify(v.tags);
    // const description: string | undefined = v.description?.trim()?.length ? v.description.trim() : undefined;
    return { ...v, tags };
}
