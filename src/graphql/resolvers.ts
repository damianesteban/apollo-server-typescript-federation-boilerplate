import { GraphQLCustomContext } from './../index.d';
import {
  Resolvers,
  MutationCreateUserArgs,
  QueryUserArgs,
  User,
} from './generated';

export const resolvers: Resolvers = {
  Query: {
    user: (
      objs: null,
      args: QueryUserArgs,
      context: GraphQLCustomContext,
    ): Promise<User> => {
      const user = context.db.findById(args.id);
      return Promise.resolve(user);
    },
  },
  Mutation: {
    createUser: (
      obj: null,
      args: MutationCreateUserArgs,
      context: GraphQLCustomContext,
    ): Promise<User> => {
      const user = context.db.create({ email: args.email });
      return Promise.resolve(user);
    },
  },
};
