"use strict"

const moment = require("moment")

module.exports = app =>{
    const Sequelize = app.Sequelize;
    let date = new Date().toLocaleString()

    app.model.define("group",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        group_name:{
            type:Sequelize.STRING
        },
        group_avatar:{
            type:Sequelize.STRING
        },
        group_desc:{
            type:Sequelize.STRING
        },
        group_placard:{
            type:Sequelize.STRING
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
