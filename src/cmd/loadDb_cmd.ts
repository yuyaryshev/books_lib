import { getBookApi, makeApiCaller } from "../api";
import axios from "axios";
import { expectDeepEqual } from "ystd";
import knexLib from "knex";
export interface ImportedRawRow {
  pk: string;
  site: string;
  id: number;
  name: string;
  grouping_name: string;
  author: string;
  content: string;
  categories_str: string;
  has_errors: boolean;
}
export async function loadDb_cmd() {
  try {
    // Open old database
    const dbPath = `D:\\b\\AppData\\BookLib\\oldLib.db`;
    const importOpts = {
      client: "better-sqlite3",
      connection: {
        filename: dbPath
      }
    };
    const knexForImport = knexLib({
      ...importOpts,
      useNullAsDefault: true
    });
    const sql = `select pk,
                            site,
                            id,
                            name,
                            grouping_name,
                            author,
                            content,
                            categories_str,
                            has_errors
                     from raw_stories limit 3`;
    const importingTableName = "raw_stories";
    const importingTableKnex = knexForImport<ImportedRawRow>(importingTableName);
    const importedDataRaw = await importingTableKnex.select().limit(10).where("id", "10589").first();
    console.log(importedDataRaw);
    const axiosOpts = {
      baseURL: `http://localhost:5173/api/` // makeCallerUrl(testServiceOpts),
    };
    const axiosInstance = axios.create(axiosOpts);
    const apiCaller = makeApiCaller(axiosInstance);
    await apiCaller.checkVersion();
    return;
    {
      const request: typeof getBookApi.request = {
        bookId: "1002",
        bodyRequest: "preview"
      };
      const response = await apiCaller.getBook(request);
      expectDeepEqual(response, {
        metadata: {
          id: 1002,
          url: "http://test1002",
          externalBookId: "test1002external",
          name: "book1002 name",
          sourceSite: "testData",
          author: "book1002 author",
          myMark: 4,
          tags: ["tag1", "tag3"]
        },
        body: "book body 02"
      });
    }
    console.log("CODE000000 getBook_cmd.ts - test successful!");
  } catch (e: any) {
    console.error("CODE000000 getBook_cmd.ts - test FAILED!");
    console.error(e.stack);
  }
}
loadDb_cmd().then();