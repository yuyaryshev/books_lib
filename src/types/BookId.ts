import { Decoder, number, oneOf, string } from "yuyaryshev-json-type-validation";
export type BookId = string | number;
export const decoderBookId: Decoder<BookId> = oneOf<BookId>(string(), number());