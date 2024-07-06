import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { Product } from "../entities/Product";
import { Context } from "../types/Context";
import { User } from "../entities/User";

// init ProductType
export const ProductType = objectType({
  name: "Product",
  definition(type) {
    type.nonNull.int("id");
    type.nonNull.string("name");
    type.nonNull.float("price");
    type.nonNull.int("creatorId");
    type.field("createdBy", {
      type: "User",
      resolve(parent, _args, _context: Context, _info): Promise<User | null> {
        // this node is Product's child, use parent.creatorId
        return User.findOne({ where: { id: parent.creatorId } });
      },
    });
  },
});

// set up ProductsQuery
export const ProductsQuery = extendType({
  type: "Query",
  definition(type) {
    // products = get products
    type.nonNull.list.nonNull.field("products", {
      type: "Product",
      // underscore make sure no error notice; _context is accessable for all the resolvers
      resolve(_parent, _args, context: Context, _info): Promise<Product[]> {
        //return Product.find();
        const { connect } = context;
        return connect.query(`select * from product`);
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
      resolve(_parent, args, context: Context, _info): Promise<Product> {
        const { name, price } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't create product without logging in.");
        }

        // .save() will return a Promise
        return Product.create({ name, price, creatorId: userId }).save();
      },
    });
  },
});
