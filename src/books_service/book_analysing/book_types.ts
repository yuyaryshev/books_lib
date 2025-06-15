import { string } from "yuyaryshev-json-type-validation";
import { StringOrNumber } from "ystd";

export type ExternalBookId = string;
export type BookSceneId = StringOrNumber;
export const decoderExternalBookId = string();

export interface BookSceneRaw {
    start_p: number;
    len: number;
    text: string;
    prev_text: string;
    next_text: string;
}

export interface ProcessedBook {
    scenes: BookSceneRaw[];
}

export interface ProcessedBookScene {
    age?: number;
}
