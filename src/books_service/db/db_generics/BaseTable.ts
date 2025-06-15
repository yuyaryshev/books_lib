import { Knex } from "knex";
import type { BaseId } from "./BaseId";
import type { TableDescriptor } from "./TableDescriptor.js";
import { IntIdManager } from "ystd";
export interface RowWithIdT extends Record<string, string | number | boolean | undefined> {
  id: string | number;
}
export interface BaseRowT extends Record<string, string | number | boolean | undefined>, RowWithIdT {
  // DOMAIN_FIELDS(Base).Core
  name: string;
  description?: string | undefined;
}
export const declareIdColumn = (t: any) => {
  t.string("id").primary();
};
export const declareBaseColumns = (t: any) => {
  declareIdColumn(t);
  t.string("name", 200);
  t.text("description");
};
export function deleteNulls<T = unknown>(v: T): T {
  for (let k in (v as any)) {
    if ((v as any)[k] === null || (v as any)[k] === undefined) {
      delete (v as any)[k];
    }
  }
  return v;
}
export class BaseTable<RowT extends RowWithIdT, RowDefaultFieldsT extends keyof RowT> {
  public readonly knex: Knex<RowT>;
  public readonly tableDescriptor: TableDescriptor;
  public idManager: IntIdManager = new IntIdManager();
  constructor(knex: Knex, tableDescriptor: TableDescriptor) {
    this.tableDescriptor = tableDescriptor;
    this.knex = knex;
  }
  knexTable() {
    return this.knex<RowT>(this.tableDescriptor.tableName);
  }
  select() {
    return this.knexTable().select();
  }
  async getById(id: BaseId): Promise<RowT | undefined> {
    return deleteNulls(await this.knexTable().select().from(this.tableDescriptor.tableName).limit(1).where("id", id).first());
  }
  async upsertById(obj: RowT) {
    try {
      return await this.knexTable().limit(1).insert((obj as any));
    } catch (e: any) {
      return await this.knexTable().where("id", obj.id).limit(1).update((obj as any));
    }
  }
  insertById(obj: RowT) {
    return this.knexTable().limit(1).insert((obj as any));
  }
  updateById(obj: RowT) {
    return this.knexTable().where("id", obj.id).limit(1).update((obj as any));
  }
  deleteById(idOrObj: BaseId | RowT) {
    const id = typeof idOrObj === "object" ? idOrObj.id : idOrObj;
    return this.knexTable().where("id", id).limit(1).del();
  }
  createTable() {
    throw new Error(`CODE00000067 Internal error. Create not specified for '${this.tableDescriptor.tableName}' table. Use the following as guidline:\n` + `
    async createTable() {
        if (!(await this.knex.schema.hasTable(this.tableDescriptor.tableName))) {
            await this.knex.schema.createTable(this.tableDescriptor.tableName, (t) => {
                // DOMAIN_${"FIELDS"}(Base).Ancestors DOMAIN_${"FIELDS"}(???)
                declareBaseColumns(t);
                //t.string("foo");
            });
        }
    }
    `);
  }
  dropTable() {
    return this.knex.schema.dropTableIfExists(this.tableDescriptor.tableName);
  }
  async fillIdManager() {
    const sql = this.idManager.makeIntervalsSql(this.tableDescriptor.tableName, 100);
    const rows = await this.knex.raw(sql);
    this.idManager.intervalsSqlRowsToIntervals(rows);
  }
}

// DOMAIN_FIELDS(Base).Core
export type BaseRowDefaultFields = "id" | "description";