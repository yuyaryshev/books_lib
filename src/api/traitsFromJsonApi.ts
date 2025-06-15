import { httpApiDefinition } from "yhttp_api";
import { decoderBookId } from "../types/index.js";
import { array, optional } from "yuyaryshev-json-type-validation";
export const traitsFromJsonApi = httpApiDefinition("traitsFromJson", {}, {}, {
  // Use method: 'GET' to limit API to only HTTP GET. Recommended value for method=undefined. method=undefined means than any type of request will be processed (GET,POST,PUT, etc).
  // Fields for GET requests are taken from queryParams (searchParams), for PUSH - are parsed from JSON body. This convension is of course also applied when method is undefined
});