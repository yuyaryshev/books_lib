import { ServiceDbEnv } from "../ServiceDbEnv.js";
// import { TableDesc } from "./index.js";
//
// export function book_bodiesTableInitializer(dbEnv: ServiceDbEnv): TableDesc | Promise<TableDesc> {
//     console.log(`CODE00000003 book_bodiesTableInitializer - @notImplemented`);
//     return { name: "TableName_TBD" };
// }
// DOMAIN(Book)
import { BaseRowDefaultFields, BaseTable, RowWithIdT } from "./db_generics/BaseTable.js";
import { TableDescriptor } from "./db_generics/TableDescriptor.js";

export const book_bodiesTableDescriptor: TableDescriptor = {
    tableName: "book_bodies",
    typeName: "bookBody",
};
export type BookBodyRowDefaultFields = BaseRowDefaultFields;

export interface BookBodyRowT extends RowWithIdT {
    // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(BookBody)
    body: string;
}

export class book_bodiesTable extends BaseTable<BookBodyRowT, BookBodyRowDefaultFields> {
    constructor(dbEnv: ServiceDbEnv) {
        super(dbEnv.knex, book_bodiesTableDescriptor);
    }

    async createTable() {
        if (!(await this.knex.schema.hasTable(this.tableDescriptor.tableName))) {
            await this.knex.schema.createTable(this.tableDescriptor.tableName, (t) => {
                // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(BookBody)
                t.bigInteger("id").primary();
                t.string("body", 2100000000);
            });
        }
    }

    upsertTestData() {
        return this.knexTable().insert([
            // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(BookBody)
            {
                id: 1001,
                body: "book body 01",
            },
            {
                id: 1002,
                body: "book body 02",
            },
            {
                id: 1003,
                body: "book body 03",
            },
        ]);
    }
}
