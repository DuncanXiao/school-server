'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('school_store_registry', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      schoolId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      account: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      identityCard: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
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
    return queryInterface.dropTable('school_store_registry');
  }
};
