'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Cargos', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull:false
      },
      nome:{
        type: Sequelize.STRING,
        allowNull:false
      },
    })
    
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('Cargos')

  }
};
