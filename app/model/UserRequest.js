"use strict";

const moment = require("moment")

module.exports = app =>{
    const Sequelize = app.Sequelize;
    let date = new Date().toLocaleString()

    const userRequests =  app.model.define("userRequest",{
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
        verify_data:{
            type:Sequelize.STRING
        },
        from_date:{
            type:Sequelize.DATE,
            defaultValue: date,
            get(){
                return moment(this.getDataValue("from_date")).format("YYYY-MM-DD HH:mm:ss");
            }
        },
        status:{
            type:Sequelize.ENUM,
            values:['wait',"agree","refuse"],
            defaultValue:"wait"
        }
    },{
        timestamps:false
    })

    userRequests.associate = function () {
        app.model.UserRequest.belongsTo(app.model.User,{foreignKey:"from_id",targetKey:"id",as:"from_user"});
        app.model.UserRequest.belongsTo(app.model.User,{foreignKey:"to_id",targetKey:"id",as:"to_user"});
    }

    return userRequests;
}
