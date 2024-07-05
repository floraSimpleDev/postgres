"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = void 0;
const nexus_1 = require("nexus");
exports.ProductType = (0, nexus_1.objectType)({
    name: "Product",
    definition(type) {
        type.nonNull.int("id");
        type.nonNull.string("name");
        type.nonNull.float("price");
    },
});
//# sourceMappingURL=Product.js.map