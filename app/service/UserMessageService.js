const Service = require("egg").Service;

class UserMessageService extends Service{
    async index(){
        const ctx = this.ctx;
        return await ctx.model.UserMessage.findAll({
            include:[
                {
                    model:ctx.model.User,
                    as:"from_user"
                },
                {
                    model:ctx.model.User,
                    as:"to_user"
                }
            ]
        });
    }

    async show(from_id,to_id){
        return await this.ctx.model.UserMessage.findAll({
            where:{
                from_id:[from_id,to_id],
                to_id:[to_id,from_id]
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
        return this.ctx.model.UserMessage.create(body);
    }
}

module.exports = UserMessageService
