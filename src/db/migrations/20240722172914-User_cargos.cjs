'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User_cargos', {
      user_id: {
        type: Sequelize.UUID,
        references:{
          model: 'Users',
          key: 'id'
        },
        allowNull:false,
        onUpdate: 'CASCADE',
        primaryKey:true,
        unique:false,
        onDelete: 'CASCADE'
      },
      cargo_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        unique:false,
        references:{
          model: 'Cargos',
          key: 'id'
        },

        allowNull:false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull:false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull:false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('User_cargos')
  }
};
