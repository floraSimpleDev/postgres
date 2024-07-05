import { DataSource } from "typeorm";

export type Context = {
  connect: DataSource;
};
