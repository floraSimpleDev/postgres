"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductMutation = exports.ProductsQuery = exports.ProductType = void 0;
const nexus_1 = require("nexus");
exports.ProductType = (0, nexus_1.objectType)({
    name: "Product",
    definition(type) {
        type.nonNull.int("id");
        type.nonNull.string("name");
        type.nonNull.float("price");
    },
});
let products = [
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
exports.ProductsQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(type) {
        type.nonNull.list.nonNull.field("products", {
            type: "Product",
            resolve(_parent, _args, _context, _info) {
                return products;
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
//# sourceMappingURL=Product.js.map