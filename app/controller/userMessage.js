"use strict"

const Controller = require("egg").Controller;

class UserMessage extends Controller{

    async index(){
        const {ctx,service} = this;
        ctx.body = await service.userMessageService.index();
    }


    async show(){
        this.ctx.body =  await this.service.userMessageService.show(this.ctx.params.from_id,this.ctx.params.to_id)
    }


    async create(){
        const message = await this.service.userMessageService.create(this.ctx.request.body);
        this.ctx.body = {
            user_message_id:message.id
        }
    }
}

module.exports = UserMessage
