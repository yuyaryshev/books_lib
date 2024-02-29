import type { Knex } from "knex";

export interface ServiceDbEnv {
    knex: Knex;
}
