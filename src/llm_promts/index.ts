// @INPRINT_START {exclude:[""], merge:[{suffix:"_promt", definitionStr:"export const llmPromts =  {\n    ITEMS\n  }", itemStr:"FILE:VAR"}]}
export * from "./findScene.js";

import { findScenes_promt } from "./findScene.js";
export const llmPromts = {
    findScenes: findScenes_promt,
};
// @INPRINT_END
