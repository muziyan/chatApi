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

  async getUser(){
    const {ctx} = this;
    ctx.body = ctx.user
  }
}

module.exports = AuthController;
