import { Decoder, object, string, number, array, anyJson, optional, boolean, oneOf } from "yuyaryshev-json-type-validation";
export type BookId = string | number;
export const decoderBookId: Decoder<BookId> = oneOf<BookId>(string(), number());