"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const nexus_1 = require("nexus");
exports.UserType = (0, nexus_1.objectType)({
    name: "User",
    definition(type) {
        type.nonNull.int("id");
        type.nonNull.string("username");
        type.nonNull.string("password");
        type.nonNull.string("email");
    },
});
//# sourceMappingURL=User.js.map