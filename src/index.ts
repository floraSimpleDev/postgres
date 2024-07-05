import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";
import typeormConfig from "./typeorm.config";
import { Context } from "./types/Context";

// set up ApolloServer
const boot = async () => {
  // connect psql database, pass connect into _context
  const connect = await typeormConfig.initialize();

  // different syntax in ApolloServer 4
  const server = new ApolloServer<Context>({
    schema,
  });

  // listen server at port 5000
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
    context: async () => ({ connect }), // different syntax in ApolloServer 4
  });
  console.log(`I'm listening at ${url}`);
};

boot();
