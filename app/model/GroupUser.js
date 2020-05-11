"use strict"

const moment = require("moment")

module.exports = app =>{
    const Sequelize = app.Sequelize;
    let date = new Date().toLocaleString()

    app.model.define("groupUser",{
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
        identity:{
            type:Sequelize.ENUM,
            values:['lord','admin','user'],
            defaultValue:"user"
        },
        created_date:{
            type:Sequelize.DATE,
            defaultValue:date,
            get(){
                return moment(this.getDataValue("created_date")).format("YYYY-MM-DD HH:mm:ss");
            }
        }
    },{
        timestamps:false
    })
}
