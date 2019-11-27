import { buildFederatedSchema } from '@apollo/federation'
import { ApolloServer } from 'apollo-server'
import { schema } from './graphql'

const initializeServer = async () => {
  const federatedSchema = buildFederatedSchema([schema])

  const server = new ApolloServer({
    schema: federatedSchema,
    playground: {
      endpoint: '/graphql',
    },
    introspection: true,
    context: async ({ req: { headers } }) => {
      console.log(headers)
      return headers
    },
  })

  await server.listen(3000, (err: Error) => {
    if (err) {
      console.log(err.message)
    }

    console.log('server started....')
  })

  return server
}

initializeServer().catch(err => console.error(err.message))
