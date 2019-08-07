'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      schoolId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      registryId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: false
      },
      receiveName1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      receiveName2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      receiveName3: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address3: {
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
      cornetPhone1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cornetPhone2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cornetPhone3: {
        type: Sequelize.STRING,
        allowNull: true
      },
      headPhotoUrl: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('student');
  }
};
