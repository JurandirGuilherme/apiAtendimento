'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users',{
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true,
        allowNull:false,
      },
      usuario:{
        type:Sequelize.STRING,
        unique: true,
        allowNull:false
      },
      nome:{
        type:Sequelize.STRING,
        allowNull:false
      },
      senha:{
        type:Sequelize.STRING,
        allowNull:false
      },
      ativo:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
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

  async down (queryInterface) {
    return await queryInterface.dropTable('Users')
  }
};
