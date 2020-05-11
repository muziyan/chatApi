'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable("group_messages",{
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
        type:Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable("group_message")
  }
};
