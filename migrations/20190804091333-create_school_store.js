'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('school_store', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      schoolId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      registryId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone3: {
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
    return queryInterface.dropTable('school_store');
  }
};
