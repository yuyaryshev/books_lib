import type { Knex } from "knex";
export interface ServiceDbEnv {
  knex: Knex;
  book_bodies_knex: Knex;
}