import { database } from './../db';
import {
  Resolvers,
  MutationCreateUserArgs,
  QueryUserArgs,
  User,
} from './generated';

export const resolvers: Resolvers = {
  Query: {
    user: (objs: null, args: QueryUserArgs): Promise<User> => {
      const user = database.fetchById(args.id);
      return Promise.resolve(user);
    },
  },
  Mutation: {
    createUser: (obj: null, args: MutationCreateUserArgs): Promise<User> => {
      const user = database.createUser(args.email);
      return Promise.resolve(user);
    },
  },
};
