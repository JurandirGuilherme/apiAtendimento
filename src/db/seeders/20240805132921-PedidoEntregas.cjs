'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Entregas', [
      {
        code: 1,
        nome: 'Posto Destino'
      },
      {
        code: 2,
        nome: 'Permanência'
      },
      {
        code: 3,
        nome: 'Gabinete'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Entregas', null, {})
  }
};
