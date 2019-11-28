import { database } from './db';
import { GraphQLCustomContext } from './index.d';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
import { schema } from './graphql';
import signale from 'signale';

const initializeServer = async () => {
  const federatedSchema = buildFederatedSchema([schema]);

  const server = new ApolloServer({
    schema: federatedSchema,
    playground: {
      endpoint: '/graphql',
    },
    introspection: true,
    context: ({ req: { headers } }): GraphQLCustomContext => {
      // console.log(headers);
      console.log('passing through...');
      return {
        db: database,
      };
    },
  });

  await server.listen(3000, (err: Error) => {
    if (err) {
      signale.error(err.message);
    }
    signale.info('server started....');
  });

  return server;
};

initializeServer().catch(err => console.error(err.message));
