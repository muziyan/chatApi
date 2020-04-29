'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable("users",{
        id:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        chat_id:{
          type:Sequelize.INTEGER
        },
        email:{
          type:Sequelize.STRING
        },
        personality:{
          type:Sequelize.STRING
        },
        avatar:{
          type:Sequelize.STRING
        },
        register_at:{
          type:Sequelize.DATE,
        },
        username:{
          type:Sequelize.STRING
        },
        password:{
          type:Sequelize.STRING
        },
        sex:{
          type:Sequelize.ENUM,
          values:["man","female","unknown"],
          defaultValue:"unknown"
        },
        birthday:{
          type:Sequelize.DATE,
        },
        phone:{
          type:Sequelize.INTEGER
        },
        flag:{
          type:Sequelize.ENUM,
          values:['online',"offline"],
          defaultValue:"offline"
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
    return queryInterface.dropTable("users")
  }
};
