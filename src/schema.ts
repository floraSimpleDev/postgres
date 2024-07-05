import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";

// set up Schema of graphQL, type data via nexus-typegen.ts
export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), "schema.graphql"),
    typegen: join(process.cwd(), "nexus-typegen.ts"),
  },
});
