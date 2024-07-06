"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMutation = exports.AuthType = void 0;
const nexus_1 = require("nexus");
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
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
                        .values({ username, email, password: hashedPassword })
                        .returning("*")
                        .execute();
                    user = result.raw[0];
                    token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET);
                }
                catch (error) {
                    console.log(error);
                }
                return { user, token };
            },
        });
    },
});
//# sourceMappingURL=Auth.js.map