import { httpApiDefinition } from "yhttp_api";
import { optional, string } from "yuyaryshev-json-type-validation";
import { decoderBookId } from "../types/BookId.js";
import { decoderBookMetadata } from "../types/BookMetadata.js";
export const setBookApi = httpApiDefinition("setBook", {
  // Includes fields from JSON body, also includes headers. Body owerwrite header fields
  //t:"example",
  bookId: decoderBookId,
  body: string(),
  metadata: optional(decoderBookMetadata)
}, {}, {
  // Use method: 'GET' to limit API to only HTTP GET. Recommended value for method=undefined. method=undefined means than any type of request will be processed (GET,POST,PUT, etc).
  // Fields for GET requests are taken from queryParams (searchParams), for PUSH - are parsed from JSON body. This convension is of course also applied when method is undefined
});