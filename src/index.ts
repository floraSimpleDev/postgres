import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";
import typeormConfig from "./typeorm.config";
import { Context } from "./types/Context";
import { auth } from "./middlewares/auth";

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
    // different syntax in ApolloServer 4
    context: async ({ req }) => {
      // use req to acquire the headers
      const token = req?.headers?.authorization
        ? auth(req.headers.authorization)
        : null;
      return { connect, userId: token?.userId };
    },
  });
  console.log(`I'm listening at ${url}`);
};

boot();
