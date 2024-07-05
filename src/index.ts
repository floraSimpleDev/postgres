import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";

// set up ApolloServer
const boot = async () => {
  const server = new ApolloServer({
    schema,
  });

  // listen server at port 5000
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
  });
  console.log(`I'm listening at ${url}`);
};

boot();
