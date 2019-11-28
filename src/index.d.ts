import lowdb = require("lowdb");

export interface GraphQLCustomContext {
  db: lowdb.LowdbSync<any>
}