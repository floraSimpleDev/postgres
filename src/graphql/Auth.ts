import { extendType, objectType, stringArg, nonNull } from "nexus";
import { Context } from "../types/Context";
import { User } from "../entities/User";
import argon2 from "argon2";

// init Auth type
export const AuthType = objectType({
  name: "AuthType",
  definition(type) {
    type.nonNull.string("token");
    type.nonNull.field("user", {
      type: "User",
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(type) {
    type.nonNull.field("register", {
      type: "AuthType",
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, context: Context, _info) {
        const { username, email, password } = args;
        const hashedPassword = await argon2.hash(password);
        let user;
        let token;

        try {
          // create a SQL query; insert a new column; into the User table; select username, email, password;
          // return all; execute these query commands
          const result = await context.connect
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ username, email, password: hashedPassword })
            .returning("*")
            .execute();
        } catch (error) {
          console.log(error);
        }
      },
    });
  },
});
