'use strict';

const { ReviewImage } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'https://www.google.com/'
      },

      {
        reviewId: 2,
        url: 'https://www.yahoo.com/'
      },

      {
        reviewId: 3,
        url: 'https://github.com/'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', {})
  }
};
