"use strict";

const moment = require("moment")

module.exports = app =>{
    const Sequelize = app.Sequelize;
    let date = new Date().toLocaleString()

    const userMessages = app.model.define("userMessage",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        from_id:{
            type:Sequelize.INTEGER
        },
        to_id:{
            type:Sequelize.INTEGER
        },
        msg:{
            type:Sequelize.STRING
        },
        msg_type:{
            type:Sequelize.ENUM,
            values:["txt",'img','voice'],
            defaultValue:"txt"
        },
        from_date:{
            type:Sequelize.DATE,
            defaultValue: date,
            get(){
                return moment(this.getDataValue("from_date")).format("YYYY-MM-DD HH:mm:ss");
            }
        }
    },{
        timestamps:false
    })

    userMessages.associate = function(){
        app.model.UserMessage.belongsTo(app.model.User, {foreignKey: 'from_id', targetKey: 'id',as:"from_user"});
        app.model.UserMessage.belongsTo(app.model.User, {foreignKey: 'to_id', targetKey: 'id',as:"to_user"});
    }

    return userMessages;
}


