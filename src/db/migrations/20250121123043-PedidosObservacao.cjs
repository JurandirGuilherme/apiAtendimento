'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.addColumn('Pedidos','observacao',{
    type: Sequelize.TEXT,
    defaultValue:null,
    allowNull: true
   })
  },

  async down (queryInterface, Sequelize) {
   queryInterface.removeColumn('Pedidos', 'observacao')
  }
};
