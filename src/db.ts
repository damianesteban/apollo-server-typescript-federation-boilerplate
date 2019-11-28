import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
const shortid = require('shortid');

const adapter = new FileSync('./db.json');
const db = lowdb(adapter);

db.defaults({
  users: [],
}).write();

interface UserData {
  id?: number;
  email: string;
}

const fetchById = async (id: string): Promise<any> => {
  const user = db
    .get('users')
    .find({ id })
    .value();
  return user;
};

const fetchUserByEmail = async (input: any): Promise<any> => {
  const { email } = input;

  const user = db
    .get('users')
    .find({ email })
    .value();
  return user;
};

export const getUserByToken = async (token: string): Promise<any> => {
  const user = db
    .get('users')
    .find({ token })
    .value();
  return user;
};

const createUser = async (email: string) => {
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
  return user;
};

export const database = {
  createUser,
  fetchById,
  fetchUserByEmail,
};
