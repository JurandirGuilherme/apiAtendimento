"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Atendimentos", {
      requerente_id: {
        type: Sequelize.UUID,
        primaryKey:true,
        allowNull:false,
        unique:true,
        references:{
          model: "Requerentes",
          key: "id"
        }
      },
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      inicio: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      fim: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Atendimentos");
  },
};
