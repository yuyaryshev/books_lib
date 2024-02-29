import { BaseTable, RowWithIdT } from "./BaseTable.js";
import { EnvWithTimers } from "ystd";
import { Decoder, number, string, oneOf } from "yuyaryshev-json-type-validation";
import type { BaseId } from "./BaseId";
import type { TablesAndViews } from "../index";
import { BaseSerialized, ExtendedFieldCategoriesObj } from "./base.js";

export interface DomainsPrereq {
    envWithTimers: EnvWithTimers;
    tables: TablesAndViews;
}

export interface DomainDescriptor<TableT extends BaseTable<any, any>> {
    name: string;
    table: TableT;
}

// DOMAIN_FIELDS(Base).Core
export type BaseObjDefaultFields = "id" | "description";

export function baseObjToRow(obj: any): any {
    const { session, type, t, labels, relationsTo, relationsFrom, ...row } = obj;
    return row;
}

export class BaseDomain<
    RowT extends RowWithIdT,
    RowDefaultFieldsT extends keyof RowT,
    ObjT,
    ObjSerializedT,
    TableT extends BaseTable<RowT, RowDefaultFieldsT>,
> {
    private domainPrereq: DomainsPrereq;
    public readonly domainDescriptor: DomainDescriptor<TableT>;

    constructor(domainPrereq: DomainsPrereq, domainDescriptor: DomainDescriptor<TableT>) {
        this.domainPrereq = domainPrereq;
        this.domainDescriptor = domainDescriptor;
    }

    protected async rowToObj(row: RowT, extend: ExtendedFieldCategoriesObj): Promise<ObjT> {
        const r = { type: this.domainDescriptor.name, ...(row as any) };
        for (let k in r) {
            if (r[k] === null || r[k] === undefined) {
                delete r[k];
            }
        }

        // if (extend.labels) {
        //     const labels = await this.domainPrereq.tables.label.knexTable().select().where({ objId: row.id });
        //     for (const labelRow of labels) {
        //         if (!r.labels) {
        //             r.labels = [] as string[][];
        //         }
        //         r.labels.push({ id: labelRow.id, type: "label", name: labelRow.name });
        //     }
        // }
        //
        // if (extend.relations) {
        //     const relsFrom = await this.domainPrereq.tables.relation.knexTable().select().where({ fromObj: row.id });
        //     for (const rel of relsFrom) {
        //         if (!r.relationsFrom) {
        //             r.relationsFrom = [] as any;
        //         }
        //         const target = await this.domainPrereq.tables.allObjects.getById(rel.toObj);
        //         r.relationsFrom.push({
        //             id: rel.id,
        //             relType: rel.relationType,
        //             target,
        //         });
        //     }
        //
        //     const relsTo = await this.domainPrereq.tables.relation.knexTable().select().where({ toObj: row.id });
        //     for (const rel of relsTo) {
        //         if (!r.relationsTo) {
        //             r.relationsTo = [] as any;
        //         }
        //         const target = await this.domainPrereq.tables.allObjects.getById(rel.fromObj);
        //         r.relationsTo.push({
        //             id: rel.id,
        //             relType: rel.relationType,
        //             target,
        //         });
        //     }
        // }

        return r;
    }

    protected objToRow(obj: BaseSerialized & Partial<ObjT>): RowT {
        return baseObjToRow(obj);
    }

    async rowsToObjects(rows: RowT[], extend: ExtendedFieldCategoriesObj) {
        const r: ObjT[] = [];
        for (const row of rows) {
            r.push(await this.rowToObj(row, extend));
        }
        return r;
    }

    async get(id: BaseId, extend: ExtendedFieldCategoriesObj): Promise<ObjT | undefined> {
        const row = await this.domainDescriptor.table.getById(id);
        if (!row) {
            return undefined;
        }
        return this.rowToObj ? this.rowToObj(row, extend) : (row as any);
    }

    async upsert(obj: { type: string; id: number | string } & Partial<ObjT>) {
        const newRow = this.objToRow ? this.objToRow(obj) : (obj as any);
        const oldRow = await this.domainDescriptor.table.getById(newRow.id);
        if (!oldRow) {
            return this.domainDescriptor.table.knexTable().insert(newRow);
        }
        const { id, ...columnsToUpdate } = newRow;
        return this.domainDescriptor.table
            .knexTable()
            .where({ id } as any)
            .update(columnsToUpdate);
    }

    delete(id: BaseId) {
        return this.domainDescriptor.table.deleteById(id);
    }

    // async select(condition?: Condition<RowT>, opts?: Opts): Promise<ObjT[]> {
    //     const rows = await this.table.knex().select(condition, opts);
    //     return this.rowsToObjects(rows);
    // }
}
