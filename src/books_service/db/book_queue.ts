import { ServiceDbEnv } from "../ServiceDbEnv.js";
// import { TableDesc } from "./index.js";
//
// export function bookQueueTableInitializer(dbEnv: ServiceDbEnv): TableDesc | Promise<TableDesc> {
//     console.log(`CODE00000015 bookQueueTableInitializer - @notImplemented`);
//     return { name: "TableName_TBD" };
// }
// DOMAIN(BookQueue)
import type { BookId } from "../../types/index.js";
import type { TableDescriptor } from "./db_generics/TableDescriptor.js";
import { QueueTable } from "./db_generics/QueueTable.js";

export const bookQueueTableDescriptor: TableDescriptor = {
    tableName: "book_queue",
    typeName: "book_queue",
};

export interface BookQueueRowT {
    // DOMAIN_FIELDS(BookQueue)
    book_id: BookId;
}

export class book_queueTable extends QueueTable<BookQueueRowT> {
    constructor(dbEnv: ServiceDbEnv) {
        super(dbEnv.knex, bookQueueTableDescriptor, "book_id"); // DOMAIN_FIELDS(BookQueue)
    }

    upsertTestData() {
        return this.knexTable().insert([
            // DOMAIN_FIELDS(BookQueue)
            {
                book_id: 1001,
            },
            {
                book_id: 1002,
            },
        ]);
    }
}
