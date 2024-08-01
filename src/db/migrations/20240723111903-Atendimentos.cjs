'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Atendimentos', {
      id:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true,
        allowNull: false
      },
      user_id:{
        type: DataTypes.UUID,
        primaryKey:true,
        references:{
          model:'Users',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      requerente_id:{
        type:DataTypes.UUID,
        primaryKey:true,
        references:{
          model:'Requerentes',
          key:'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      inicio:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:false
      },
      fim:{
        type:DataTypes.DATE,
        allowNull:true
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
    await queryInterface.dropTable('Atendimentos')
  }
};
