"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./schema");
const boot = async () => {
    const server = new server_1.ApolloServer({
        schema: schema_1.schema,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 5000 },
    });
    console.log(`I'm listening at ${url}`);
};
boot();
//# sourceMappingURL=index.js.map