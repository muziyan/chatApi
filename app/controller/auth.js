"use strict";

const Controller = require("egg").Controller
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")

class AuthController extends Controller{
  async login(){
    const {service} = this;
    const {chat_id,password} = this.ctx.request.body;
    let user = await service.auth.getUser(chat_id);
    if (!user){
      this.ctx.status = 404
      this.ctx.body = {
        message:"account or email not found!"
      }
    }else{
      if (bcrypt.compareSync(password,user.password)){
        const userAgent = this.ctx.header["user-agent"]
        await service.userService.update(user,{flag:"online"})
        let token = jwt.sign(user.id,userAgent)
        this.ctx.session.userId = user.id;
        this.ctx.session.user = user;
        this.ctx.status = 200;
        this.ctx.body = {
          token:`Bearer ${token}`
        }
      }else{
        this.ctx.status = 422;
        this.ctx.body = {
          message:"password error!",
        }
      }
    }
  }

  async logout(){
    let user = await this.service.userService.show(this.ctx.session.user.id);
    await this.service.userService.update(user,{flag:"offline"})
    this.ctx.session.user = null
    this.ctx.status = 204;
  }

  async getUser(){
    const {ctx} = this;
    ctx.body = await this.service.userService.show(ctx.session.userId);
  }
}

module.exports = AuthController;
