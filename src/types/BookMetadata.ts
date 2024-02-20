import { Decoder, object, string, number, array, anyJson, optional, boolean } from "yuyaryshev-json-type-validation";
import { BookId, decoderBookId } from "./BookId.js";

export interface BookMetadata {
    id: BookId;
    name: string;
    author: string;
    myMark: number;
    tags: string[];
    deletedFlag?: boolean;
}

export const decoderBookMetadata: Decoder<BookMetadata> = object({
    id: decoderBookId,
    name: string(),
    author: string(),
    myMark: number(),
    tags: array(string()),
    deletedFlag: optional(boolean()),
});
