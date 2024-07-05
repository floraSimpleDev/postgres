import { extendType, objectType } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const ProductType = objectType({
  name: "Product",
  definition(type) {
    type.nonNull.int("id");
    type.nonNull.string("name");
    type.nonNull.float("price");
  },
});

let products: NexusGenObjects["Product"][] = [
  {
    id: 1,
    name: "Product 1",
    price: 15.99,
  },
  {
    id: 2,
    name: "Product 2",
    price: 12.39,
  },
];

export const ProductsQuery = extendType({
  type: "Query",
  definition(type) {
    // products = get products
    type.nonNull.list.nonNull.field("products", {
      type: "Product",
      // underscore make sure no error notice
      resolve(_parent, _args, _context, _info) {
        return products;
      },
    });
  },
});
