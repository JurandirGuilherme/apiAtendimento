'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Requerentes', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true,
        unique:true,
        allowNull:false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      preferencial:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull:false
      },
      via:{
        type:Sequelize.INTEGER,
        defaultValue:1,
        allowNull:false
      },
      atendido:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull:false
      },
      user_id:{
        type: Sequelize.UUID,
        primaryKey:true,
        allowNull:false,
        references:{
          model: 'Users',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('Requerentes')
  }
};
