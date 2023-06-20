'use strict';

const { Review } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      // 3 PER SPOT
      // Owned by userId 1: Kris
      {
        spotId: 1,
        userId: 2,
        review: 'A pleasant and inviting place, equipped and new. Close to Lake Tahoe and also close to restaurants and shops. You can cook in the kitchen, the balcony is very pleasant and enjoyable.',
        stars: 5
      },

      {
        spotId: 1,
        userId: 3,
        review: 'Check in was really easy! The host at the office was super friendly and welcoming. I appreciated him explaining everything that was offered with the stay. Thank you!',
        stars: 4
      },

      {
        spotId: 1,
        userId: 4,
        review: 'We loved our stay at the Tiny House. It was like camping luxury. This is at an RV/trailer park but it’s so nice and has great walking paved trails close by.',
        stars: 5
      },

      // Owned by userId 2: Andrew
      {
        spotId: 2,
        userId: 5,
        review: 'Me and my significant other had a wonderful time staying here!! The home is really beautiful and was extremely clean. The appliances all work well.',
        stars: 3
      },

      {
        spotId: 2,
        userId: 1,
        review: 'The surroundings were beautiful and serene -- a wonderful escape from the city. The tiny house is indeed tiny, but it had everything we needed.',
        stars: 4
      },

      {
        spotId: 2,
        userId: 4,
        review: 'If you want a wonderful, relaxing, unplugged escape from your busy life, this little cabin provides the perfect getaway.',
        stars: 4
      },

      // Owned by userId 3: Droo
      {
        spotId: 3,
        userId: 1,
        review: 'A beautiful get-away and off the grid. Loved the Tiny House and peaceful nights. Loved relaxing out on the porch and enjoying the the beautiful scenery.',
        stars: 5
      },

      {
        spotId: 3,
        userId: 2,
        review: 'If you want a nice quick trip away from cell reception and wifi in nature to play boardgames and read with friends, this is excellent.',
        stars: 4
      },

      {
        spotId: 3,
        userId: 5,
        review: 'Location is perfect for getting away from everyone and everything! A cute, humble abode with 360 views of nature, would certainly stay again.',
        stars: 3
      },

      // Owned by userId 4: Gary
      {
        spotId: 4,
        userId: 1,
        review: 'Very cute space for our short stay. Easy trip to Monterey, Big Sur. Felt very spacious for a tiny home and had all the amenities.',
        stars: 4
      },

      {
        spotId: 4,
        userId: 2,
        review: 'This is the perfect place to disconnect from the daily world of technology and enjoy some peaceful relaxation time.',
        stars: 4
      },

      {
        spotId: 4,
        userId: 5,
        review: 'Cabin description is accurate and directions are on point. Though small cabin was very well equiped and comfortable. Kitchen is well stocked with utensils.',
        stars: 5
      },

      // Owned by userId 4: Sam
      {
        spotId: 5,
        userId: 1,
        review: 'We really enjoyed tasajara tiny house, it was cute. We had some difficulties with electricity and power that were admittedly our own faults.',
        stars: 2
      },

      {
        spotId: 5,
        userId: 2,
        review: 'The Tiny House is on a truly amazing piece of property. The natural beauty of the valley made it a perfect destination to unplug.',
        stars: 3
      },

      {
        spotId: 5,
        userId: 3,
        review: 'We had a quick weekend stay filled with stargazing, reading while in the hammock or under the trees.',
        stars: 5
      },
      // Owned by userId 1: Kris (1-6)
      {
        spotId: 6,
        userId: 3,
        review: 'A pleasant and inviting place, equipped and new. Close to Lake Tahoe and also close to restaurants and shops.',
        stars: 5
      },

      {
        spotId: 6,
        userId: 2,
        review: 'Check in was really easy! The host at the office was super friendly and welcoming. I appreciated him explaining everything that was offered with the stay.',
        stars: 4
      },

      {
        spotId: 6,
        userId: 5,
        review: 'We loved our stay at the Tiny House. It was like camping luxury.',
        stars: 5
      },

      // Owned by userId 2: Andrew (2-7)
      {
        spotId: 7,
        userId: 3,
        review: 'Me and my significant other had a wonderful time staying here!! The home is really beautiful and was extremely clean.',
        stars: 3
      },

      {
        spotId: 7,
        userId: 4,
        review: 'The surroundings were beautiful and serene -- a wonderful escape from the city. The tiny house is indeed tiny, but it had everything we needed.',
        stars: 4
      },

      {
        spotId: 7,
        userId: 1,
        review: 'If you want a wonderful, relaxing, unplugged escape from your busy life, this little cabin provides the perfect getaway. The surroundings are absolutely beautiful and the cabin.',
        stars: 4
      },

      // Owned by userId 3: Droo (3-8)
      {
        spotId: 8,
        userId: 2,
        review: 'A beautiful get-away and off the grid. Loved the Tiny House and peaceful nights. Loved relaxing out on the porch and enjoying the the beautiful scenery. Will definitely book again if in the area.',
        stars: 5
      },

      {
        spotId: 8,
        userId: 1,
        review: 'If you want a nice quick trip away from cell reception and wifi in nature to play boardgames and read with friends, this is excellent. I definitely recommend getting food supplies on the way',
        stars: 4
      },

      {
        spotId: 8,
        userId: 5,
        review: 'Location is perfect for getting away from everyone and everything! A cute, humble abode with 360 views of nature, would certainly stay again.',
        stars: 5
      },

      // Owned by userId 4: Gary (4-9)
      {
        spotId: 9,
        userId: 1,
        review: 'Very cute space for our short stay. Easy trip to Monterey, Big Sur. Felt very spacious for a tiny home and had all the amenities. Camas was super helpful and communicative before and during our stay.',
        stars: 4
      },

      {
        spotId: 9,
        userId: 3,
        review: 'This is the perfect place to disconnect from the daily world of technology and enjoy some peaceful relaxation time. There is a great outdoor space.',
        stars: 3
      },

      {
        spotId: 9,
        userId: 5,
        review: 'Cabin description is accurate and directions are on point. Though small cabin was very well equiped and comfortable. Kitchen is well stocked with utensils.',
        stars: 5
      },

      // Owned by userId 4: Sam (5-10)
      {
        spotId: 10,
        userId: 4,
        review: 'We really enjoyed tasajara tiny house, it was cute. We had some difficulties with electricity and power that were admittedly our own faults.',
        stars: 2
      },

      {
        spotId: 10,
        userId: 1,
        review: 'The Tiny House is on a truly amazing piece of property. The natural beauty of the valley made it a perfect destination to unplug.',
        stars: 3
      },

      {
        spotId: 10,
        userId: 2,
        review: 'We had a quick weekend stay filled with stargazing, reading while in the hammock or under the trees, and driving into Carmel for farmers markets and access to Highway 1.',
        stars: 5
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {})
  }
};
