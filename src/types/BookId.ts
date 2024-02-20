import { Decoder, object, string, number, array, anyJson, optional, boolean } from "yuyaryshev-json-type-validation";

export type BookId = string;
export const decoderBookId: Decoder<BookId> = string();
