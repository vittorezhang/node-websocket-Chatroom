const Datastore = require('nedb');
const db={
  user:new Datastore({filename:"./db/users.db",autoload:true}),
  message:new Datastore({filename:"./db/messages.db",autoload:true}),
  userMessage:new Datastore({filename:"./db/userMessage.db",autoload:true})
}
module.exports=db;
