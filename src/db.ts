import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('./db.json');
const db = lowdb(adapter);

interface UserData {
  id?: number;
  email: string;
}

// Set defaults
const initDb = () => {
  return db.defaults({ users: [] }).write();
};

const create = (userData: UserData) => {
  const newUser = db
    .get('users')
    .push({ id: shortid.generate(), email: userData.email })
    .write();

  return newUser;
};

const findByEmail = (email: string) => {
  const user = db
    .get('users')
    .find({ email })
    .value();
  return user;
};

const upsertUser = (data: UserData) => {
  const user = db
    .get('users')
    .find({ id: data.id })
    .value();
  if (!user) {
    db.get('users')
      .push(data)
      .write();
    return data;
  } else {
    db.update({ id: data.id }).write();
    return data;
  }
};

export const database = {
  create,
  findByEmail,
  initDb,
  upsertUser,
}