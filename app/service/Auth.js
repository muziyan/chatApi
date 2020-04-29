'use strict';

const Service = require("egg").Service

class AuthService extends  Service{
  async getUser(chat_id){
    let rex = /@/;
    if (rex.test(chat_id)){
      return await this.ctx.model.User.findOne({
        where:{
          email : chat_id
        }
      })
    }else{
      return await this.ctx.model.User.findOne({
        where:{
          chat_id
        }
      })
    }
  }
}

module.exports = AuthService;
