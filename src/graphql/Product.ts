import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { Product } from "../entities/Product";

// init ProductType
export const ProductType = objectType({
  name: "Product",
  definition(type) {
    type.nonNull.int("id");
    type.nonNull.string("name");
    type.nonNull.float("price");
  },
});

// set up ProductsQuery
export const ProductsQuery = extendType({
  type: "Query",
  definition(type) {
    // products = get products
    type.nonNull.list.nonNull.field("products", {
      type: "Product",
      // underscore make sure no error notice
      resolve(_parent, _args, _context, _info): Promise<Product[]> {
        return Product.find();
      },
    });
  },
});

// add new product into Product object
export const CreateProductMutation = extendType({
  type: "Mutation",
  definition(type) {
    type.nonNull.field("createProduct", {
      type: "Product",
      args: {
        name: nonNull(stringArg()),
        price: nonNull(floatArg()),
      },
      resolve(_parent, args, _context, _info): Promise<Product> {
        const { name, price } = args;

        // .save() will return a Promise
        return Product.create({ name, price }).save();
      },
    });
  },
});
