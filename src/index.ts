import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
import { schema } from './graphql';
import { handleGraphQLContext } from './auth';
import signale from 'signale';

const initializeServer = async () => {
  const federatedSchema = buildFederatedSchema([schema]);

  const server = new ApolloServer({
    schema: federatedSchema,
    playground: {
      endpoint: '/graphql',
    },
    introspection: true,
    context: handleGraphQLContext,
    formatError: (err: any) => {
      signale.error(err);
      return err;
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
