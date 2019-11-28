import { database } from './db';
import lowdb = require("lowdb");

type DatabaseType = typeof database;
export interface GraphQLCustomContext {
  db: DatabaseType
}