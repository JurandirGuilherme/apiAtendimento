"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cargos",
      [
        {
          id: 1,
          nome: "Gerente",
        },
        {
          id:2,
          nome: 'Perito'
        },
        {
          id: 3,
          nome: 'Atendente'
        },
        {
          id: 4,
          nome: 'Impressão'
        }
      ], {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cargos', null, {})
  },
};
