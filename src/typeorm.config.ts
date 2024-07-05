import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";

dotenv.config();

// entities added to DataSource, and synchronize every change of entities
export default new DataSource({
  type: "postgres",
  url: process.env.CONNECTION_STRING,
  entities: [Product],
  synchronize: true, // only use it in development stage
});
/* query at psql -> Schemas -> Tables -> product
select * from product 
*/
