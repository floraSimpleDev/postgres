"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsQuery = exports.ProductType = void 0;
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
//# sourceMappingURL=Product.js.map