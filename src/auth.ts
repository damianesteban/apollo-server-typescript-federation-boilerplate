import { User } from './graphql/generated';
import { fetchUserByToken } from './db';
import { Request, Response } from 'express';

// our context interface
export interface Context {
  token?: string;
}

// handle all of the token magic here
function createContext(token: string): Promise<Context> | Context {
  return {
    token,
  };
}

// create context for requests
export function handleGraphQLContext(ctx: {
  connection?: any;
  req?: Request;
  res?: Response;
}) {
  const { req, connection } = ctx;

  // Already connected with a subscription
  if (connection) {
    return connection.context;
  }

  // Check the request for the token
  const token = req.headers && req.headers.token;
  return createContext(token as string);
}

// Check if the user is logged in or whatever you want to do to authenticate the user
export async function authenticateContext(context: Context): Promise<User> {
  if (!context.token) {
    // Boo hoo 👎
    throw new Error('user is not logged in');
  }
  const user = await fetchUserByToken(context.token);
  if (!user) {
    // Boo hoo 👎
    throw new Error('invalid token');
  }
  // Sweet 👍
  return user;
}
