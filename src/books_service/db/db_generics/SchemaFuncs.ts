import { TablesAndViews } from "../index";

export async function createTablesIfNotExist(tables: TablesAndViews) {
    for (const table of Object.values(tables)) {
        try {
            await table.createTable();
        } catch (e: any) {}
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
