import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
import { schema } from './graphql';
import { handleGraphQLContext } from './auth';
import signale from 'signale';
import { GraphQLFormattedError, GraphQLError } from 'graphql';

const initializeServer = async (): Promise<ApolloServer> => {
  const federatedSchema = buildFederatedSchema([schema]);

  const server = new ApolloServer({
    schema: federatedSchema,
    playground: {
      endpoint: '/graphql',
    },
    introspection: true,
    context: handleGraphQLContext,
    formatError: (
      err: GraphQLError,
    ): GraphQLFormattedError<Record<string, any>> => {
      signale.error(err);
      return err;
    },
  });

  await server.listen(4001, (err: Error) => {
    if (err) {
      signale.error(err.message);
    }
    signale.info('server started....');
  });

  return server;
};

initializeServer().catch(err => signale.error(err.message));
