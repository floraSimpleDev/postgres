import { DataSource } from "typeorm";

export type Context = {
  connect: DataSource;
  userId: number | undefined;
};
