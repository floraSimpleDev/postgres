"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMutation = exports.AuthType = void 0;
const nexus_1 = require("nexus");
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
exports.AuthType = (0, nexus_1.objectType)({
    name: "AuthType",
    definition(type) {
        type.nonNull.string("token");
        type.nonNull.field("user", {
            type: "User",
        });
    },
});
exports.AuthMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(type) {
        type.nonNull.field("register", {
            type: "AuthType",
            args: {
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            async resolve(_parent, args, context, _info) {
                const { username, email, password } = args;
                const hashedPassword = await argon2_1.default.hash(password);
                let user;
                let token;
                try {
                    const result = await context.connect
                        .createQueryBuilder()
                        .insert()
                        .into(User_1.User)
                        .values({
                        username,
                        password: hashedPassword,
                        email,
                    })
                        .returning("*")
                        .execute();
                }
                catch (error) {
                    console.log(error);
                }
            },
        });
    },
});
//# sourceMappingURL=Auth.js.map