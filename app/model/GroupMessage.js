"use strict"

const moment = require("moment")

module.exports = app =>{
    const Sequelize = app.Sequelize;
    let date = new Date().toLocaleString()

    app.model.define("groupMessage",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        group_id:{
            type:Sequelize.INTEGER
        },
        user_id:{
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
}
