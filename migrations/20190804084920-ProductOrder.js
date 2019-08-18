'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_order', {
      id: {
          autoIncrement: true,
          primaryKey   : true,
          type         : Sequelize.INTEGER
      },
      storeUuid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      studentOrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable('product_order');
  }
};
