import { getUserByToken } from './db';
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
  // we already connected with a subscription
  if (connection) {
    return connection.context;
  }
  // check the request for the token
  const token = req.headers && req.headers.token;
  return createContext(token as string);
}

// check if the user is logged in or whatever you want to do to authenticate the user
export async function authenticateContext(context: Context): Promise<any> {
  if (!context.token) {
    // too bad 👎
    throw new Error('user is not logged in');
  }
  const user = await getUserByToken(context.token);
  if (!user) {
    // too bad 👎
    throw new Error('invalid token');
  }
  // yay 👍
  return user;
}
