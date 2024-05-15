import { getCachedServerSettings } from "../books_service/settings";
import { initBooksLibService } from "../books_service/books_service.js";
export function initServer() {
  const serverSettings = getCachedServerSettings("settings.json5");
  return initBooksLibService(serverSettings);
}