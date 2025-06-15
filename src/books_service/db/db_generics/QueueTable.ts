import { Knex } from "knex";
import type { TableDescriptor } from "./TableDescriptor.js";

export class QueueTable<RowT extends object> {
    public readonly knex: Knex<RowT>;
    public readonly tableDescriptor: TableDescriptor;
    public readonly columnNames: string[];

    constructor(knex: Knex, tableDescriptor: TableDescriptor, columnNamesStr: string) {
        this.tableDescriptor = tableDescriptor;
        this.knex = knex;
        this.columnNames = columnNamesStr
            .split(" ")
            .map((s) => s.trim())
            .filter((s) => s.length);
    }

    knexTable() {
        return this.knex<RowT>(this.tableDescriptor.tableName);
    }

    select() {
        return this.knexTable().select();
    }

    async upsert(obj: RowT) {
        await this.knexTable()
            .insert(obj as any)
            .onConflict()
            .ignore();
    }

    async remove(obj: RowT) {
        return await this.knexTable().where(obj).del();
    }

    async clear() {
        return await this.knexTable().del();
    }

    async copyFrom(sourceTableName: string, doDistinct: boolean) {
        // Build SELECT query from source table
        let query = this.knex.select(this.columnNames).from(sourceTableName);
        if (doDistinct) {
            query.distinct();
        }

        // Perform insert with conflict ignore (SQLite-style upsert)
        return await this.knexTable()
            .insert(query as any)
            .onConflict()
            .ignore();
    }

    async createTable() {
        if (!(await this.knex.schema.hasTable(this.tableDescriptor.tableName))) {
            await this.knex.schema.createTable(this.tableDescriptor.tableName, (t) => {
                for (let columnName of this.columnNames) {
                    t.string(columnName, 200).primary();
                    // t.bigInteger(columnName).primary();
                }
            });
        }
    }

    dropTable() {
        return this.knex.schema.dropTableIfExists(this.tableDescriptor.tableName);
    }
}
