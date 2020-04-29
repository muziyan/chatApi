"use strict";

const moment = require("moment")

module.exports = app =>{
  const Sequelize = app.Sequelize

  let date = new Date().toLocaleString()

  return app.model.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chat_id: {
      type: Sequelize.INTEGER
    },
    personality: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    },
    register_at: {
      type: Sequelize.DATE,
      defaultValue: date,
      get(){
        return moment(this.getDataValue("register_at")).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    sex: {
      type: Sequelize.ENUM,
      values: [ "man", "female", "unknown" ],
      defaultValue: "unknown"
    },
    birthday: {
      type: Sequelize.DATE,
      defaultValue: date
    },
    phone: {
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    flag:{
      type:Sequelize.ENUM,
      values:['online','offline'],
      defaultValue:'offline'
    }
  },{
    timestamps:false
  });
}
