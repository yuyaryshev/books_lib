import axios from "axios";
import { httpApiFunction } from "yhttp_api";
import { expectDeepEqual } from "ystd";
import { BookLibServerSettings } from "./settings.js";
import { makeApiCaller, makeCallerUrl } from "../api/index.js";
export async function serverStartupAutotests(opts: BookLibServerSettings) {
  const axiosInstance = axios.create({
    baseURL: makeCallerUrl(opts)
  });
  const apiCaller = makeApiCaller(axiosInstance);

  // const resp = await api1func({ a: "AA", b: "BB" });
  // expectDeepEqual(resp, { r: "AA BB PONG!" });
}