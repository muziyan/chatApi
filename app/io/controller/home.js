'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller{

    async index(){

        const {ctx,app,logger} = this;
        const nsp = app.io.of("/")
        const message = ctx.args[0] || {}

        const to_user = await ctx.model.User.findByPk(message.to_id)
        const msg = await this.service.userMessageService.create(message)

        const msg_data = await this.ctx.model.UserMessage.findOne({
            where:{
                id:msg.id
            },
            include:[
                {
                    model:this.ctx.model.User,
                    as:"from_user"
                },
                {
                    model:this.ctx.model.User,
                    as:"to_user"
                }
            ]
        })

        console.log(to_user.socket_id)
        console.log(message.to_id)

        nsp.emit(`${to_user.socket_id} ${message.to_id}`, {
            data:JSON.stringify(msg_data)
        })
    }

    async login(){
        const {ctx,app} = this;
        const nsp = app.io.of("/")
        const message = ctx.args[0] || {}
        console.log(ctx.session.user)
        await this.service.userService.saveSocketId(message.id,ctx.socket.id)
        nsp.emit(`login ${message.id}`,{
            socket_id: ctx.socket.id
        })
    }

    async logout(){
        const {ctx} = this;
        const message = ctx.args[0] || {}
        await this.service.userService.delSocketId(message.id)
    }
}

module.exports = HomeController
