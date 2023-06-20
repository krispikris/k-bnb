'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      ownerId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
        onDelete: 'CASCADE'
      },

      address: {
        type: Sequelize.STRING(30),
        allowNull: false
      },

      city: {
        type: Sequelize.STRING(30),
        allowNull: false
      },

      state: {
        type: Sequelize.STRING(30),
        allowNull: false
      },

      country: {
        type: Sequelize.STRING(30),
        allowNull: false
      },

      lat: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },

      lng: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },

      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },

      description: {
        type: Sequelize.STRING(256),
        allowNull: false
      },

      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots', {});
  }
};
