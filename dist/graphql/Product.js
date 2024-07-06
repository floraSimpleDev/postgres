"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductMutation = exports.ProductsQuery = exports.ProductType = void 0;
const nexus_1 = require("nexus");
const Product_1 = require("../entities/Product");
exports.ProductType = (0, nexus_1.objectType)({
    name: "Product",
    definition(type) {
        type.nonNull.int("id");
        type.nonNull.string("name");
        type.nonNull.float("price");
    },
});
exports.ProductsQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(type) {
        type.nonNull.list.nonNull.field("products", {
            type: "Product",
            resolve(_parent, _args, context, _info) {
                const { connect } = context;
                return connect.query(`select * from product`);
            },
        });
    },
});
exports.CreateProductMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(type) {
        type.nonNull.field("createProduct", {
            type: "Product",
            args: {
                name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                price: (0, nexus_1.nonNull)((0, nexus_1.floatArg)()),
            },
            resolve(_parent, args, context, _info) {
                const { name, price } = args;
                const { userId } = context;
                if (!userId) {
                    throw new Error("Can't create product without logging in.");
                }
                return Product_1.Product.create({ name, price, creatorId: userId }).save();
            },
        });
    },
});
//# sourceMappingURL=Product.js.map