import { Decoder, number, oneOf, string } from "yuyaryshev-json-type-validation";

export type BaseId = string | number;
export const decoderBaseId: Decoder<BaseId> = oneOf<BaseId>(number(), string());
