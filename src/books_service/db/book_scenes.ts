import { ServiceDbEnv } from "../ServiceDbEnv.js";
// import { TableDesc } from "./index.js";
//
// export function book_scenesTableInitializer(dbEnv: ServiceDbEnv): TableDesc | Promise<TableDesc> {
//     console.log(`CODE00000003 book_scenesTableInitializer - @notImplemented`);
//     return { name: "TableName_TBD" };
// }
// DOMAIN(Book)
import { BaseRowDefaultFields, BaseTable, RowWithIdT } from "./db_generics/BaseTable.js";
import { TableDescriptor } from "./db_generics/TableDescriptor.js";
import { string } from "../../../../json-type-validation/dist/types/index.js";
import { BookId } from "../../types/index.js";

export const book_scenesTableDescriptor: TableDescriptor = {
    tableName: "book_scenes",
    typeName: "bookScene",
};
export type BookSceneRowDefaultFields = BaseRowDefaultFields;

export interface BookSceneRowT extends RowWithIdT {
    // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(BookScene)
    book_id: BookId;
    start_p: number;
    len: number;
    text: string;
    prev_text: string;
    next_text: string;
}

export class book_scenesTable extends BaseTable<BookSceneRowT, BookSceneRowDefaultFields> {
    constructor(dbEnv: ServiceDbEnv) {
        super(dbEnv.knex, book_scenesTableDescriptor);
    }

    async createTable() {
        if (!(await this.knex.schema.hasTable(this.tableDescriptor.tableName))) {
            await this.knex.schema.createTable(this.tableDescriptor.tableName, (t) => {
                // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(BookScene)
                t.bigInteger("id").primary();
                t.bigInteger("book_id");
                t.bigInteger("start_p");
                t.bigInteger("len");
                t.string("text");
                t.string("prev_text");
                t.string("next_text");
            });
        }
    }

    upsertTestData() {
        return this.knexTable().insert([
            // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(BookScene)
            {
                id: 1001,
                book_id: 1001,
                start_p: 0,
                len: 10,
                text: "aaaa1001",
                prev_text: "bbb1001",
                next_text: "ccc1001",
            },
            {
                id: 1002,
                book_id: 1002,
                start_p: 0,
                len: 10,
                text: "aaaa1002",
                prev_text: "bbb1002",
                next_text: "ccc1002",
            },
            {
                id: 1003,
                book_id: 1003,
                start_p: 0,
                len: 10,
                text: "aaaa1003",
                prev_text: "bbb1003",
                next_text: "ccc1003",
            },
        ]);
    }
}
