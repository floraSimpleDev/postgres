"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./schema");
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
const auth_1 = require("./middlewares/auth");
const boot = async () => {
    const connect = await typeorm_config_1.default.initialize();
    const server = new server_1.ApolloServer({
        schema: schema_1.schema,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 5000 },
        context: async ({ req }) => {
            var _a;
            const token = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization)
                ? (0, auth_1.auth)(req.headers.authorization)
                : null;
            return { connect, userId: token === null || token === void 0 ? void 0 : token.userId };
        },
    });
    console.log(`I'm listening at ${url}`);
};
boot();
//# sourceMappingURL=index.js.map