'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student_order', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      storeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      redPacket: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      packagingFee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      expressFee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type     : Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type     : Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('student_order');
  }
};
