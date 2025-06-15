import { ServiceDbEnv } from "../ServiceDbEnv.js";
// import { TableDesc } from "./index.js";
//
// export function bookSceneQueueTableInitializer(dbEnv: ServiceDbEnv): TableDesc | Promise<TableDesc> {
//     console.log(`CODE00000016 bookSceneQueueTableInitializer - @notImplemented`);
//     return { name: "TableName_TBD" };
// }
// DOMAIN(BookSceneQueue)
import type { BookId } from "../../types/index.js";
import type { BookSceneId } from "../book_analysing/index.js";
import type { TableDescriptor } from "./db_generics/TableDescriptor.js";
import { QueueTable } from "./db_generics/QueueTable.js";

export const bookSceneQueueTableDescriptor: TableDescriptor = {
    tableName: "bookSceneQueue",
    typeName: "bookSceneQueue",
};

export interface BookSceneQueueRowT {
    // DOMAIN_FIELDS(BookSceneQueue)
    book_id: BookId;
    book_scene_id: BookSceneId;
}

export class book_scene_queueTable extends QueueTable<BookSceneQueueRowT> {
    constructor(dbEnv: ServiceDbEnv) {
        super(dbEnv.knex, bookSceneQueueTableDescriptor, "book_id book_scene_id"); // DOMAIN_FIELDS(BookSceneQueue)
    }

    upsertTestData() {
        return this.knexTable().insert([
            // DOMAIN_FIELDS(BookSceneQueue)
            {
                book_id: 1001,
                book_scene_id: 100100,
            },
            {
                book_id: 1002,
                book_scene_id: 100100,
            },
        ]);
    }
}
