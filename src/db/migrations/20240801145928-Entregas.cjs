'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Entregas', {
      code:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
      },
      nome:{
        type:Sequelize.STRING,
        allowNull:false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Entregas')
  }
};
