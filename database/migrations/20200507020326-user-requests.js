'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable("user_requests",{
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
        type:Sequelize.DATE
      },
      status:{
        type:Sequelize.ENUM,
        values:['wait',"agree","refuse"],
        defaultValue:"wait"
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
    return queryInterface.dropTable("user_requests")
  }
};
