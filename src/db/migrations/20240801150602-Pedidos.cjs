"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pedidos", {
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      solicitante_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      operador_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: true,
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      posto_origem: {
        type: Sequelize.STRING,

        allowNull: false,
      },
      impresso: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      dt_impressao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      entrega_code: {
        type: Sequelize.INTEGER,
        references: {
          model: "Entregas",
          key: "code",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pedidos");
  },
};
