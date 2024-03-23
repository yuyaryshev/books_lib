import { ServiceDbEnv } from "../ServiceDbEnv.js";
// import { TableDesc } from "./index.js";
//
// export function booksTableInitializer(dbEnv: ServiceDbEnv): TableDesc | Promise<TableDesc> {
//     console.log(`CODE00000001 booksTableInitializer - @notImplemented`);
//     return { name: "TableName_TBD" };
// }

// DOMAIN(Book)
import { BaseTable, BaseRowDefaultFields, BaseRowT, TableDescriptor, declareBaseColumns } from "./db_generics/BaseTable.js";

export const bookTableDescriptor: TableDescriptor = {
    tableName: "books",
    typeName: "book",
};

export type BookRowDefaultFields = BaseRowDefaultFields;

export interface BookRowT extends BaseRowT {
    // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(Book)
    author: string;
    myMark: number;
    tags: string;
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
                t.string("name", 200);
                t.string("author", 200);
                t.integer("myMark");
                t.string("tags", 2000);
            });
        }
    }

    upsertTestData() {
        return this.knexTable().insert([
            // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(Book)
            {
                id: 1001,
                name: "book1001 name",
                author: "book1001 author",
                myMark: 3,
                tags: `["tag1", "tag2"]`,
            },
            {
                id: 1002,
                name: "book1002 name",
                author: "book1002 author",
                myMark: 4,
                tags: `["tag1", "tag3"]`,
            },
            {
                id: 1003,
                name: "book1003 name",
                author: "book1003 author",
                myMark: 1,
                tags: `["tag2"]`,
            },
        ]);
    }
}
