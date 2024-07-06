import { extendType, objectType, stringArg, nonNull } from "nexus";
import { Context } from "../types/Context";
import { User } from "../entities/User";
import argon2 from "argon2";
import * as jwt from "jsonwebtoken";

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
    // login resolver
    type.nonNull.field("login", {
      type: "AuthType",
      args: { username: nonNull(stringArg()), password: nonNull(stringArg()) },
      // query a user, if user exists, then check password
      async resolve(_parent, args, _context: Context, _info) {
        const { username, password } = args;
        // find where the username is equal to the args.username
        const user = await User.findOne({ where: { username } }); // try to use findOne in case error

        if (!user) {
          throw new Error("User Not Found.");
        }
        // cause we use find to query username, it returns an array of users, but we need only one
        const isValid = await argon2.verify(user.password, password);

        if (!isValid) {
          throw new Error("Invalid Password.");
        }

        // create token for the user
        const token = jwt.sign(
          { userId: user.id },
          process.env.TOKEN_SECRET as jwt.Secret
        );

        return { user, token };
      },
    });

    /* 
      mutation Login {
      login (username: "one", password: "123456") {
        token
        user {
          id
          email
          username
        }
      }
    }
 */
    // register resolver
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

          // get auth user info
          user = result.raw[0];
          token = jwt.sign(
            { userId: user.id },
            process.env.TOKEN_SECRET as jwt.Secret
          );
        } catch (error) {
          console.log(error);
        }

        return { user, token };
      },
    });
  },
});

/* query input
mutation Register {
  register(username:"two", email: "two@gmail.com", password: "123456") {
    user {
      email
      id
      password
      username
      }
    token
  }
} */
