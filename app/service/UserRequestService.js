"use strict"
const Service = require("egg").Service;
class UserRequestService extends Service{
    async index(){
        const Op = this.app.Sequelize.Op;
        return this.ctx.model.UserRequest.findAll({
            where:{
                status:"wait",
                [Op.or]:[
                    {from_id:this.ctx.user.id},
                    {to_id:this.ctx.user.id}
                ]
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
    }

    async create(body){
        return this.ctx.model.UserRequest.findAll(body)
    }

    async show(id){
        const Op = this.app.Sequelize.Op;
        return this.ctx.model.UserRequest.findAll({
            where:{
                status:"agree",
                [Op.or]:[
                    {from_id:id},
                    {to_id:id}
                ]
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
            ],
            attributes:["from_id","to_id"]
        })
    }

    async update(id,status){
        const userRequest = await this.ctx.model.UserRequest.findByPk(id);
        return userRequest.update({status})
    }
}

module.exports = UserRequestService;
