const db=require("./db");
const util=require("./utils")
const fs=require('fs')
module.exports ={
  async saveUser(user,status){
    console.log(user.name,status);
    const users= await this.getUsers(user.name);
    if (users.some(item => item.name === user.name)) return false;
    if(status==='login'){
      return new Promise((resolve, reject) => {
        db.user.insert(user,(err,newUser) => {
          if(err){
            reject(err)
          }else {
            resolve(newUser)
          }
        })
      })
    }
  },
  saveMessage(from,to,message,type){
    if(type==='image'){
      const base64Data = message.replace(/^data:image\/\w+;base64,/, "")
      const dataBuffer = new Buffer.from(base64Data,'base64')
      const filename = util.MD5(base64Data)
      fs.writeFileSync(`./upload/${filename}.png`,dataBuffer)
      message=`/assets/images/${filename}.png`
    }
    console.log("\033[36m"+from.name+"\033[0m对<\033[36m"+to.name+"\033[0m>:\033[32m"+message+"\033[0m")
    const doc={
      from,
      to,
      content:message,
      type,
      time:new Date().getTime()
    }
    return new Promise((resolve, reject) => {
      db.message.insert(doc,(err,newDoc) => {
        if(err){
          reject(err)
        }else {
          resolve(newDoc)
        }
      })
    })
  },
  saveUserMessage(from,to,message,type){
    if(type==='image'){
      const base64Data = message.replace(/^data:image\/\w+;base64,/, "")
      const dataBuffer = new Buffer.from(base64Data,'base64')
      const filename = util.MD5(base64Data)
      fs.writeFileSync(`./upload/${filename}.png`,dataBuffer)
      message=`/assets/images/${filename}.png`
    }
    console.log("\033[36m"+from.name+"\033[0m对<\033[36m"+to.name+"\033[0m>:\033[32m"+message+"\033[0m")
    const doc={
      from,
      to,
      content:message,
      type,
      time:new Date().getTime()
    }
    return new Promise((resolve, reject) => {
      db.userMessage.insert(doc,(err,newDoc) => {
        if(err){
          reject(err)
        }else {
          resolve(newDoc)
        }
      })
    })
  },
  getMessages() {
    return new Promise((resolve, reject) => {
      db.message.find({}).sort({time:1}).skip(0).limit(100).exec((err,docs) => {
        if(err){
          reject(err)
        }else {
          resolve(docs)
        }
      })
    })
  },
  getUserMessages() {
    return new Promise((resolve, reject) => {
      db.userMessage.find({}).sort({time:1}).skip(0).limit(100).exec((err,docs) => {
        if(err){
          reject(err)
        }else {
          resolve(docs)
        }
      })
    })
  },
  getUsers(){
    return new Promise((resolve, reject) => {
      db.user.find({}).sort({time:1}).skip(0).limit(100).exec((err,docs) => {
        if(err){
          reject(err)
        }else {
          resolve(docs)
        }
      })
    })
  }
};
