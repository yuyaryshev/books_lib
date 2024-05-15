import { httpApiDefinition } from "yhttp_api";
import { constant, Decoder, number, oneOf, string } from "yuyaryshev-json-type-validation";

export const getVersionApi = httpApiDefinition(
    "getVersion",
    {},
    {
        version: number(),
        ts: string(),
    },
    {},
);
