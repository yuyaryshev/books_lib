import { httpApiDefinition } from "yhttp_api";
import { array } from "yuyaryshev-json-type-validation";
import { decoderBookId } from "../types/BookId.js";
export const setLastBooksApi = httpApiDefinition("setLastBooks", {
  // Includes fields from JSON body, also includes headers. Body owerwrite header fields
  //t:"example",
  lastBooks: array(decoderBookId)
}, {}, {
  // Use method: 'GET' to limit API to only HTTP GET. Recommended value for method=undefined. method=undefined means than any type of request will be processed (GET,POST,PUT, etc).
  // Fields for GET requests are taken from queryParams (searchParams), for PUSH - are parsed from JSON body. This convension is of course also applied when method is undefined
});