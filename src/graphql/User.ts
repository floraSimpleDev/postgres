import { objectType } from "nexus";

export const UserType = objectType({
  name: "User",
  definition(type) {
    type.nonNull.int("id");
    type.nonNull.string("username");
    type.nonNull.string("password");
    type.nonNull.string("email");
  },
});
