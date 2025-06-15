import { string } from "yuyaryshev-json-type-validation";
import { StringOrNumber } from "ystd";

export type ExternalBookId = string;
export type BookSceneId = StringOrNumber;
export const decoderExternalBookId = string();

export interface ProcessedBook {}

export interface ProcessedBookScene {}

export interface BookSceneRaw {
    start_p: number;
    len: number;
    text: string;
    prev_text: string;
    next_text: string;
}
