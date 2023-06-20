'use strict';

const { Spot } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '267 Beaver Way',
        city: 'Coupeville',
        state: 'WA',
        country: 'United States',
        lat: 38.81001221,
        lng: -121.24899957,
        name: 'Fort Ebey',
        description: 'The Fort Ebey Treehouse is an incredible and unique escape that invites you to relax and connect with nature without sacrificing any modern amenities.',
        price: 251
      },

      {
        ownerId: 2,
        address: '3674 Grand Ave',
        city: 'Dunes',
        state: 'AK',
        country: 'United States',
        lat: 34.06199155,
        lng: -118.24554911,
        name: 'The Drommen Shack',
        description: '250 sq ft treehouse with stairs leading to 2 lofts with beds overlooking the most gorgeous view of the Silicon Valley.',
        price: 107
      },

      {
        ownerId: 3,
        address: '69 Pardise Sky Way',
        city: 'Honolulu',
        state: 'HI',
        country: 'United States',
        lat: 37.77648571,
        lng: -122.40936024,
        name: 'NATURAVE the Hut',
        description: 'NATURAVE is a treetops unique stay experience. A one of a kind cabin where, from the comfort of your bedroom, you can enjoy the birds singing, sightseeing families of monkeys passing in the mountain.',
        price: 315
      },

      {
        ownerId: 4,
        address: '1 Jamung Way',
        city: 'WIllington',
        state: 'VA',
        country: 'United States',
        lat: 37.77648571,
        lng: -122.40936024,
        name: 'Forest Great Pine',
        description: 'The Big Pine House  is located right on the hillside, the surrounding old pine forest brings a cool vibe all year round for Homestay. ',
        price: 96
      },

      {
        ownerId: 5,
        address: '99 Falcon Way',
        city: 'Perryville',
        state: 'MO',
        country: 'United States',
        lat: 37.77648571,
        lng: -122.40936024,
        name: 'TreeLoft at BaseCamp',
        description: 'Mastate features a two story treehouse with full bed, sink, screened living area and open deck.',
        price: 222
      },

      {
        ownerId: 1,
        address: '3520 Pointy Way',
        city: 'Index',
        state: 'WA',
        country: 'United States',
        lat: 37.77648571,
        lng: -122.40936024,
        name: 'The Treeframe Cabin',
        description: 'Outrageously beautiful modern treehouse aframe cabin perched 13ft off the ground between 4 evergreen trees.',
        price: 3677
      },

      {
        ownerId: 2,
        address: '41 Porter Place',
        city: 'Port Angeles',
        state: 'WA',
        country: 'United States',
        lat: 37.55648571,
        lng: -12.40696024,
        name: 'Eagles Perch',
        description: 'Stunning Tree house looking over the Strait of Juan De Fuca is a total North-West Washington experience. It is made of cedar with rustic touches.',
        price: 310
      },

      {
        ownerId: 3,
        address: '17 Half Dome Circle',
        city: 'Cantabria',
        state: 'UT',
        country: 'United States',
        lat: 37.77648571,
        lng: -121.56936024,
        name: 'Chulavista Dome',
        description: 'The Chulavista Dome is a geodesic dome high up in the trees.',
        price: 211
      },

      {
        ownerId: 4,
        address: '30 Hawk Way',
        city: 'Colombia',
        state: 'CA',
        country: 'United States',
        lat: 37.77648571,
        lng: -72.40936024,
        name: 'Owl’s Perch Treehouse',
        description: 'Nestled between large cedars and a giant maple, Owl’s Perch offers stunning views across the Salish Sea.',
        price: 181
      },

      {
        ownerId: 5,
        address: '0 Blazing Lillard ',
        city: 'Portland',
        state: 'OR',
        country: 'United States',
        lat: 37.77648571,
        lng: -132.40936024,
        name: 'The Jungle Canopy',
        description: 'Experience the beauty and vibrancy of Costa Rica 85 off the jungle floor. El Castillo Mastate features a two story treehouse.',
        price: 105
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {})
  }
};
