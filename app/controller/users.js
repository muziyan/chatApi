"use strict";
// app/controller/users.js

const Controller = require("egg").Controller

class UserController extends Controller{

  async index(){
    const {service} = this;
    this.ctx.body = await service.userService.index();
  }

  async show(){
    const {service} = this;
    this.ctx.body = await service.userService.show(this.ctx.params.id)
  }

  async create(){
    const {service} = this;
    const user = await service.userService.create(this.ctx.request.body);
    this.ctx.status = 201
    this.ctx.body = {
      "user_id":user.id
    };
  }

  async update(){
    const {service} = this;

    const user = await service.userService.show(this.ctx.params.id)
    if (!user){
      this.ctx.status = 404;
      return false;
    }

    await service.userService.update(user,this.ctx.request.body)
    this.ctx.status = 204
  }

  async destroy(){
    const {service} = this;

    const user = service.userService(this.ctx.params.id);
    if (!user){
      this.ctx.status = 404;
      return false;
    }
    await service.userService.destroy(user);
    this.ctx.status = 200;
  }

  async checkEmail(){
    const {service} = this;
    let isEmail = await service.userService.getEmail(this.ctx.params.email)
    if (isEmail){
      this.ctx.status = 422;
    }else{
      this.ctx.status = 200;
    }
  }

  async checkChatId(){
    const {service} = this;
    let isChatId = await service.userService.getChatId(this.ctx.params.chat_id)
    if (isChatId){
      this.ctx.status = 422;
    }else{
      this.ctx.status = 200;
    }
  }
}

module.exports = UserController
