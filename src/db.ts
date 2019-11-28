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
  const newUserId = db
    .get('users')
    .push({ id: shortid.generate(), email: userData.email })
    .write().id;

  console.log('id ' + newUserId)
  const result = db
    .get('users')
    .find({ id: newUserId })
    .value();

  console.log(result);
  return result;
};

const findById = (id: string) => {
  const user = db
    .get('users')
    .find({ id })
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
  findById,
  initDb,
  upsertUser,
};
