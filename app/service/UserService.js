const Service = require("egg").Service

const bcrypt = require("bcrypt")

class UserService extends Service{
  async index(){
    const ctx = this.ctx;
    return await ctx.model.User.findAll();
  }

  async show(id){
    const ctx = this.ctx;
    return await ctx.model.User.findByPk(id);
  }

  async create(body){
    const ctx = this.ctx;
    let {username,email,chat_id,password} = body;
    password = bcrypt.hashSync(password,10)

    return await ctx.model.User.create({
      username,
      email,
      chat_id,
      password
    })
  }

  async update(user,body){
    return await user.update(body)
  }

  async destroy(user){
    return user.destroy();
  }

  async getEmail(email){
    const ctx = this.ctx;
    let users = await ctx.model.User.findAll({
      where:{
        email
      }
    });
    return users.length > 0
  }

  async getChatId(chat_id){
    const ctx = this.ctx;
    let users = await ctx.model.User.findAll({
      where:{
        chat_id
      }
    });
    return users.length;
  }

  async saveSocketId(id,socketId){
    let user = await this.show(id)
    user.update({
      socket_id:socketId
    })
  }

  async delSocketId(id){
    let user = await this.show(id)
    user.update({
      socket_id:null
    })
  }

}

module.exports = UserService;
