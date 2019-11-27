import { resolvers } from './resolvers'
import { gql } from 'apollo-server'
import path from 'path'
import { mergeTypes, fileLoader } from 'merge-graphql-schemas'

const typeDefs = fileLoader(path.join(__dirname, './schema'))
const mergedTypeDefs = mergeTypes(typeDefs, { all: true });
const gqlTypeDefs = gql`
  ${mergedTypeDefs}
`

export const schema = {
  typeDefs: gqlTypeDefs,
  resolvers,
}
