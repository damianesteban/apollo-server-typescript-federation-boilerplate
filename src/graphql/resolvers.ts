import {
  Resolvers,
  MutationCreateUserArgs,
  QueryUserArgs,
  User,
} from './generated'

export const resolvers: Resolvers = {
  Query: {
    user: (objs: any, {}, args: QueryUserArgs): Promise<User> => {
      return Promise.resolve({ id: args.id, email: 'damian.esteban@gmail.com' })
    },
  },
  Mutation: {
    createUser: (
      objs: any,
      {},
      args: MutationCreateUserArgs,
    ): Promise<User> => {
      return Promise.resolve({ id: '12', email: args.email })
    },
  },
}
