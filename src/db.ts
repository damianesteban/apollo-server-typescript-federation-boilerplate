import { User } from './graphql/generated';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
const shortid = require('shortid');

const adapter = new FileSync('./db.json');
const db = lowdb(adapter);

db.defaults({
  users: [],
}).write();

const fetchById = async (id: string): Promise<User> => {
  const user = db
    .get('users')
    .find({ id })
    .value();
  return user as User;
};

const fetchUserByEmail = async (email: string): Promise<User> => {
  const user = db
    .get('users')
    .find({ email })
    .value();
  return user as User;
};

export const fetchUserByToken = async (token: string): Promise<User> => {
  const user = db
    .get('users')
    .find({ token })
    .value();
  return user as User;
};

const createUser = async (email: string): Promise<User> => {
  const existingUser = db
    .get('users')
    .find({ email })
    .value();

  if (existingUser) {
    throw new Error('user already exist');
  }

  const id = shortid.generate();

  const user = {
    email,
    id,
  };

  db.get('users')
    .push(user)
    .write();
  return user as User;
};

export const database = {
  createUser,
  fetchById,
  fetchUserByEmail,
};
