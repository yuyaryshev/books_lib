import { ServiceDbEnv } from "../ServiceDbEnv.js";
// import { TableDesc } from "./index.js";
//
// export function book_scene_traitsTableInitializer(dbEnv: ServiceDbEnv): TableDesc | Promise<TableDesc> {
//     console.log(`CODE00000003 book_scene_traitsTableInitializer - @notImplemented`);
//     return { name: "TableName_TBD" };
// }
// DOMAIN(Book)
import { BaseRowDefaultFields, BaseTable, deleteNulls, RowWithIdT } from "./db_generics/BaseTable.js";
import { TableDescriptor } from "./db_generics/TableDescriptor.js";
import { BookId } from "../../types/index.js";
import { isEmptyObject } from "ystd";

export const book_scene_traitsTableDescriptor: TableDescriptor = {
    tableName: "book_scene_traits",
    typeName: "bookSceneTraits",
};
export type BookSceneTraitsRowDefaultFields = BaseRowDefaultFields;

export interface BookSceneTraitsRowT extends RowWithIdT {
    // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(BookScene)
    book_id: BookId;
    json: string;

    age?: number;
}

export class book_scene_traitsTable extends BaseTable<BookSceneTraitsRowT, BookSceneTraitsRowDefaultFields> {
    constructor(dbEnv: ServiceDbEnv) {
        super(dbEnv.knex, book_scene_traitsTableDescriptor);
    }

    async createTable() {
        if (!(await this.knex.schema.hasTable(this.tableDescriptor.tableName))) {
            await this.knex.schema.createTable(this.tableDescriptor.tableName, (t) => {
                // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(BookSceneTraits)
                t.bigInteger("id").primary();
                t.bigInteger("book_id");
                t.string("json");
            });
        }
    }

    upsertTestData() {
        return this.knexTable().insert([
            // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(BookSceneTraits)
            {
                id: 1001,
                book_id: 1001,
                json: "{}",
            },
            {
                id: 1002,
                book_id: 1002,
                json: "{}",
            },
            {
                id: 1003,
                book_id: 1003,
                json: "{}",
            },
        ]);
    }

    extractFromJson(json: string | object): { [key: string]: number | string } {
        const r = typeof json === "object" ? json : JSON.parse(json);
        return r;
    }

    async updateFromJson() {
        // TODO add Api for updateFromJson() call
        // TODO add test for updateFromJson() call

        const rows: BookSceneTraitsRowT[] = await this.knexTable().select(["id", "book_id", "json"]);

        for (const row of rows) {
            const extracted = deleteNulls(this.extractFromJson(row.json));
            delete extracted.id;
            delete extracted.json;

            if (!isEmptyObject(extracted)) {
                await this.knexTable().where({ id: row.id, book_id: row.book_id }).update(extracted);
                break;
            }
        }
    }
}
