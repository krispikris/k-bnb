'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Kris',
        lastName: 'Han',
        email: 'kris@kristopherhan.com',
        username: 'krispikris',
        hashedPassword: bcrypt.hashSync('treebnb')
      },

      {
        firstName: 'Andrew',
        lastName: 'Kim',
        email: 'andrewkim@gmail.com',
        username: 'superhotfire',
        hashedPassword: bcrypt.hashSync('treebnb')
      },

      {
        firstName: 'Droo',
        lastName: 'Duong',
        username: 'drooboo',
        email: 'droo@gmail.com',
        hashedPassword: bcrypt.hashSync('treebnb')
      },

      {
        firstName: 'Gary',
        lastName: 'Spng',
        username: 'garbear',
        email: 'garysong@gmail.com',
        hashedPassword: bcrypt.hashSync('treebnb')
      },

      {
        firstName: 'Samuel',
        lastName: 'Suh',
        username: 'sambam',
        email: 'samsuh@gmail.com',
        hashedPassword: bcrypt.hashSync('treebnb')
      },

      {
        firstName: 'Demo',
        lastName: 'User',
        username: 'demoUser',
        email: 'user@demo.io',
        hashedPassword: bcrypt.hashSync('treebnb')
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
      const Op = Sequelize.Op;
      await queryInterface.bulkDelete('Users', {
        username: { [Op.in]: ['krispikris', 'superhotfire', 'drooboo', 'garbear', 'sambam', 'demoUser'] }
      }, {});

  }
};
