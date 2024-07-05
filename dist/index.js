"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./schema");
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
const boot = async () => {
    const connect = await typeorm_config_1.default.initialize();
    const server = new server_1.ApolloServer({
        schema: schema_1.schema,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 5000 },
        context: async () => ({ connect }),
    });
    console.log(`I'm listening at ${url}`);
};
boot();
//# sourceMappingURL=index.js.map