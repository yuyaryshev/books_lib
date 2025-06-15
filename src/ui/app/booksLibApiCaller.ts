import axios from "axios";
import { ApiCaller, makeApiCaller } from "../../api";
export function makeBooksLibApiCaller() {
  if ((window as any).apiCaller) {
    return;
  }
  // const testServiceOpts = getCachedServerSettings("settings.json5");
  const axiosOpts = {
    baseURL: `http://localhost:5173/api/` // makeCallerUrl(testServiceOpts),
  };
  const axiosInstance = axios.create(axiosOpts);
  const bookLibApiCaller = makeApiCaller(axiosInstance);
  (window as any).apiCaller = bookLibApiCaller;
  return bookLibApiCaller;
}
export function useApiCaller(): ApiCaller {
  if ((window as any).apiCaller) {
    return (window as any).apiCaller;
  }
  makeBooksLibApiCaller();
  return (window as any).apiCaller;
}