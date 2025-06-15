import { ServiceDbEnv } from "../ServiceDbEnv.js";
// import { TableDesc } from "./index.js";
//
// export function booksTableInitializer(dbEnv: ServiceDbEnv): TableDesc | Promise<TableDesc> {
//     console.log(`CODE00000001 booksTableInitializer - @notImplemented`);
//     return { name: "TableName_TBD" };
// }
// DOMAIN(Book)
import { BaseRowDefaultFields, BaseRowT, BaseTable } from "./db_generics/BaseTable.js";
import { TableDescriptor } from "./db_generics/TableDescriptor.js";
export const bookTableDescriptor: TableDescriptor = {
  tableName: "books",
  typeName: "book"
};
export type BookRowDefaultFields = BaseRowDefaultFields;
export interface BookRowT extends BaseRowT {
  // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(Book)
  url: string;
  externalBookId: string;
  sourceSite: string;
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
      await this.knex.schema.createTable(this.tableDescriptor.tableName, t => {
        // DOMAIN_FIELDS(Base).Ancestors DOMAIN_FIELDS(Book)
        t.bigInteger("id").primary();
        t.string("url", 2048);
        t.string("externalBookId", 200);
        t.string("name", 200);
        t.string("description", 2048);
        t.string("sourceSite", 200);
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
      url: "http://book1001name",
      externalBookId: "book1001 name",
      name: "book1001 name",
      sourceSite: "testData",
      author: "book1001 author",
      myMark: 3,
      tags: `["tag1", "tag2"]`
    }, {
      id: 1002,
      url: "http://book1002 name",
      externalBookId: "book1002 name",
      name: "book1002 name",
      sourceSite: "testData",
      author: "book1002 author",
      myMark: 4,
      tags: `["tag1", "tag3"]`
    }, {
      id: 1003,
      url: "http://book1003 name",
      externalBookId: "book1003 name",
      name: "book1003 name",
      sourceSite: "testData",
      author: "book1003 author",
      myMark: 1,
      tags: `["tag2"]`
    }]);
  }
}