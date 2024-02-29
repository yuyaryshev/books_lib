import { ServiceDbEnv } from "../ServiceDbEnv.js";
// import { TableDesc } from "./index.js";
//
// export function booksTableInitializer(dbEnv: ServiceDbEnv): TableDesc | Promise<TableDesc> {
//     console.log(`CODE00000001 booksTableInitializer - @notImplemented`);
//     return { name: "TableName_TBD" };
// }

// DOMAIN(Book)
import { BaseTable, BaseRowDefaultFields, BaseRowT, TableDescriptor, declareBaseColumns } from "./db_generics/BaseTable.js";
import { Knex } from "knex";

export const bookTableDescriptor: TableDescriptor = {
    tableName: "books",
    typeName: "book",
};

export type BookRowDefaultFields = BaseRowDefaultFields;

export interface BookRowT extends BaseRowT {
    // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(Book)
}

export class booksTable extends BaseTable<BookRowT, BookRowDefaultFields> {
    constructor(dbEnv: ServiceDbEnv) {
        super(dbEnv.knex, bookTableDescriptor);
    }

    async createTable() {
        if (!(await this.knex.schema.hasTable(this.tableDescriptor.tableName))) {
            await this.knex.schema.createTable(this.tableDescriptor.tableName, (t) => {
                // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(Book)
                t.bigInteger("id").primary();
                t.string("appId", 200);
                t.string("workerId", 200);

                t.string("db", 200);
                t.string("fbq", 200);
                t.string("token", 200);
                t.string("ts_started", 200);
                t.string("ts_finished", 200);
                t.string("type", 200);
            });
        }
    }

    upsertTestData() {
        return this.knexTable().insert([
            // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(Book)
            {
                id: 1001,
                appId: "testApp01",
                workerId: "workerId1",
                db: "targetDb1",
                fbq: "targetFbq1",
                token: "token1",
                ts_started: "2000-01-01 00:00:00",
                type: "Book",
            },
            {
                id: 1002,
                appId: "testApp02",
                workerId: "workerId2",
                db: "targetDb2",
                fbq: "targetFbq2",
                token: "token2",
                ts_started: "2000-01-02 00:00:00",
                type: "Book",
            },
            {
                id: 1003,
                appId: "testApp03",
                workerId: "workerId3",
                db: "targetDb3",
                fbq: "targetFbq3",
                token: "token3",
                ts_started: "2000-01-03 00:00:00",
                type: "Book",
            },
        ]);
    }
}
