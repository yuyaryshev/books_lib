import { ApiRoot } from "yhttp_api_express";
import { TablesAndViews } from "./db/index.js";
export interface ServiceApiEnv {
  apiRoot: ApiRoot;
  tables: TablesAndViews;
}