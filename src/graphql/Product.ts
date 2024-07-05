import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

// init ProductType
export const ProductType = objectType({
  name: "Product",
  definition(type) {
    type.nonNull.int("id");
    type.nonNull.string("name");
    type.nonNull.float("price");
  },
});

// instance products
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

// set up ProductsQuery
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
/* query in Apollo server 
query ProductsQuery {
  products {
    id
    name
    price
  }
} */

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
      resolve(_parent, args, _context, _info) {
        const { name, price } = args;
        const product = {
          id: products.length + 1,
          name,
          price,
        };

        products.push(product);
        console.log(products);

        return product;
      },
    });
  },
});

/* mutation CreateProduct {
  createProduct(name:"Product 3", price: 21.22) {
    id
    name
    price
  }
} */
