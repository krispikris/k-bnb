'use strict';

const { Booking } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '2022-03-01',
        endDate: '2022-03-10'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2022-03-11',
        endDate: '2022-03-20'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2022-03-21',
        endDate: '2022-03-30'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {})
  }
};
