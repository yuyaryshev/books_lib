import { ServiceDbEnv } from "../ServiceDbEnv.js";
// import { TableDesc } from "./index.js";
//
// export function booksLastTableInitializer(dbEnv: ServiceDbEnv): TableDesc | Promise<TableDesc> {
//     console.log(`CODE00000015 booksLastTableInitializer - @notImplemented`);
//     return { name: "TableName_TBD" };
// }
// DOMAIN(BooksLast)
import type { BookId } from "../../types/index.js";
import type { TableDescriptor } from "./db_generics/TableDescriptor.js";
import { Knex } from "knex";
import { MAX_LAST_BOOKS } from "../../server/constants.js";

export const booksLastTableDescriptor: TableDescriptor = {
    tableName: "books_last",
    typeName: "books_last",
};

export interface BooksLastRowT {
    // DOMAIN_FIELDS(BooksLast)
    book_id: BookId;
    ts: string;
}

export class books_lastTable {
    public readonly knex: Knex<BooksLastRowT>;
    public readonly tableDescriptor: TableDescriptor;

    constructor(dbEnv: ServiceDbEnv) {
        this.tableDescriptor = booksLastTableDescriptor;
        this.knex = dbEnv.knex;
    }

    knexTable() {
        return this.knex<BooksLastRowT>(this.tableDescriptor.tableName);
    }

    select() {
        return this.knexTable().select();
    }

    upsertTestData() {
        return this.knexTable().insert([
            // DOMAIN_FIELDS(BooksLast)
            {
                book_id: 1001,
                ts: "2000-01-01",
            },
            {
                book_id: 1002,
                ts: "2000-01-01",
            },
        ]);
    }

    async touch(book_id: BookId) {
        const nowStr = new Date().toISOString();
        await this.knexTable().insert({ book_id, ts: nowStr }).onConflict("book_id").merge({ ts: nowStr });
    }

    async remove(book_id: BookId) {
        return await this.knexTable().where({ book_id }).del();
    }

    async clear() {
        return await this.knexTable().del();
    }

    async createTable() {
        if (!(await this.knex.schema.hasTable(this.tableDescriptor.tableName))) {
            await this.knex.schema.createTable(this.tableDescriptor.tableName, (t) => {
                t.bigInteger("book_id").primary();
                t.string("ts", 50);
            });
        }
    }

    async deleteAllButRecent(limit: number = MAX_LAST_BOOKS) {
        const table = this.knexTable();
        const idsToKeep = await table.select("book_id").orderBy("ts", "desc").limit(limit);
        const bookIds = idsToKeep.map((row) => row.book_id);
        await table.whereNotIn("book_id", bookIds).del();
    }

    dropTable() {
        return this.knex.schema.dropTableIfExists(this.tableDescriptor.tableName);
    }
}
