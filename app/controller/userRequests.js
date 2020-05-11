'use strict'

const Controller = require("egg").Controller

class UserRequests extends Controller{

    async index(){
        this.ctx.body = await this.service.userRequestService.index()
    }

    async create(){
        const userRequest = await this.service.userRequestService.create(this.ctx.request.body)
        this.ctx.body = {
            user_request_id:userRequest.id
        }
    }

    async show(){
        let friends = await this.service.userRequestService.show(this.ctx.params.id);

        friends = friends.map(v =>{
            return  v.from_id !== this.ctx.user.id ? v.from_user : v.to_user;
        })

        this.ctx.body = friends
    }

    async update(){
        await this.service.userRequestService.update(id,this.ctx.request.body.status)
        this.ctx.status = 204;
    }
}

module.exports = UserRequests;
