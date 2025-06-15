import { TablesAndViews } from "../index.js";
export async function createTablesIfNotExist(tables: TablesAndViews) {
  for (const table of Object.values(tables)) {
    try {
      await table.createTable();
    } catch (e: any) {}
  }
}
export async function fillIdManagers(tables: TablesAndViews) {
  for (const table of Object.values(tables)) {
    try {
      if ((table as any).fillIdManager !== undefined) {
        await (table as any).fillIdManager();
      }
    } catch (e: any) {
      console.warn(`CODE00000010 fillIdManagers SQL failed`);
    }
  }
}
export async function recreateTables(tables: TablesAndViews) {
  for (const table of Object.values(tables)) {
    try {
      await table.dropTable();
    } catch (e: any) {}
    await table.createTable();
  }
}
export async function upsertTestData(tables: TablesAndViews) {
  for (const table of Object.values(tables)) {
    try {
      await table.upsertTestData();
    } catch (e: any) {}
  }
}