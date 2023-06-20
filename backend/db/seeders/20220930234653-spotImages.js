'use strict';

const { SpotImage } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      // EACH SPOT 5 IMAGES
      // SpotID: 1 | Owned by Kris
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/32e6234f-2f32-4b7c-8137-ee81e9f6c7d1.jpeg',
        preview: true
      },

      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/9c6f8dd9-9758-4ef3-80b0-16cdbbda5118.jpg',
        preview: true
      },

      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/e80c9eed-5ab9-45ae-8fc9-84b0db64fefa.jpeg',
        preview: true
      },

      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/2eef4813-7ac5-4dcb-9094-4e1c1727e3a9.jpeg',
        preview: true
      },

      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/50d7f590-3e0a-425e-b00a-92811e4989a0.jpeg',
        preview: true
      },

      // SpotID: 2 | Owned by Andrew
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-24598097/original/91290830-0db6-40c0-a23b-86a904ee5239.jpeg',
        preview: true
      },

      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/147f068f-b2d2-4d27-92f0-b93c7c772463.jpg',
        preview: true
      },

      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/5f79a3c4-ea63-474b-9924-c4fde883015d.jpg',
        preview: true
      },

      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/826303c3-ef43-43f2-8f44-3038fcaa41ed.jpg',
        preview: true
      },

      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-24598097/original/048b9889-9ca2-418f-a6c1-0bacb2c71230.jpeg',
        preview: true
      },

      // SpotID: 3 | Owned by Droo
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/379f84f9-d418-41ad-b1b3-e1f9d007124d.jpg ',
        preview: true
      },

      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53292029/original/3e737e92-7f4a-455b-9afa-73158ccf2045.jpeg ',
        preview: true
      },

      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/1e9851ac-cb69-4dd4-994d-a87e1006e6cb.jpg ',
        preview: true
      },

      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53292029/original/2c116e6a-6748-4f3f-b371-bf79a9110dcd.jpeg ',
        preview: true
      },

      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53292029/original/773a32bb-62db-43f7-94da-66fc5c1b214e.jpeg ',
        preview: true
      },

      // SpotID: 4 | Owned by Gary
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29172819/original/8dae018e-ee08-4956-ab90-4a451e96e424.jpeg',
        preview: true
      },

      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29172819/original/1babdf09-e230-475b-a5a1-15322b5c8322.jpeg ',
        preview: true
      },

      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29172819/original/aa09a8ed-3010-451b-af6b-0b3579b38c7d.jpeg ',
        preview: true
      },

      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29172819/original/0818fd2e-46dc-4c53-89e1-7d70762987e2.jpeg ',
        preview: true
      },

      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29172819/original/6f8e6276-c8d8-4808-b695-03c76899ba8f.jpeg ',
        preview: true
      },

      // SpotID: 5 | Owned by Sam
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/becad6f1-e9bc-4b54-afe8-910ad18d169a.jpg',
        preview: true
      },

      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/c60b13a5-922c-47d6-b865-d56c5f94a36b.jpg',
        preview: true
      },

      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/3b8e9fda-1cdb-4d96-bc45-70051eda0249.jpg',
        preview: true
      },

      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/67e87924-608a-4909-8d52-7ee6ef7ae62b.jpg ',
        preview: true
      },

      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/7b2c87a8-4fb7-4023-8447-2d75baa19f5c.jpg ',
        preview: true
      },

      // SpotID: 6 | Owned by Kris
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/bca57cdc-bc62-4366-91e9-03ba6c4059ee.jpeg ',
        preview: true
      },

      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/a7c25c65-91ab-45dd-81ac-9dcd60c34623.jpg ',
        preview: true
      },

      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/5d444dfa-471d-48fe-9fcf-be9b3c093b8a.jpeg ',
        preview: true
      },

      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/992ad5e1-78c8-43d4-9b69-a898d4ac21f6.jpeg ',
        preview: true
      },

      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/bf91b1f5-1942-4ecd-95b0-328bb617c47e.jpeg ',
        preview: true
      },

      // SpotID: 7 | Owned by Andrew
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/9a160552-6fa1-4d07-9a49-b93a4792dd74.jpeg ',
        preview: true
      },

      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/3053f0e2-ee01-4d33-be67-2b7d3724e447.jpeg ',
        preview: true
      },

      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/d4a7343f-6475-4e58-a3ce-0e28599a7ea2.jpeg ',
        preview: true
      },

      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/b7b4da60-02cd-4193-8d54-5c55312b89c6.jpeg ',
        preview: true
      },

      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/c7fc8d28-781e-4dc5-a95d-07924e8a2260.jpeg ',
        preview: true
      },

      // SpotID: 8 | Owned by Droo
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/fe5ff38b-d386-46b2-b9f8-f36d18fcdaad.jpg ',
        preview: true
      },

      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/9c915da2-4353-429b-a165-a93f7161e859.jpg ',
        preview: true
      },

      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/05f2cdc5-831e-448b-9503-d69697066292.jpg ',
        preview: true
      },

      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/8818dc4c-294a-4371-b6b7-2aee7cf4aff7.jpg ',
        preview: true
      },

      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/ff0a68b3-4fbe-4a74-b016-220997f79b7b.jpg ',
        preview: true
      },

      // SpotID: 9 | Owned by Gary
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/712a31dd-fad0-4882-ba33-783e5e8620e4.jpg',
        preview: true
      },

      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-610511843622686196/original/5d54cea0-788e-462e-83a3-5142da58193a.jpeg ',
        preview: true
      },

      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-610511843622686196/original/6c8aa4ed-a574-493a-9f68-813e775fb12f.jpeg ',
        preview: true
      },

      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-610511843622686196/original/19a492ca-0e15-4b4b-9711-6000b657c094.jpeg ',
        preview: true
      },

      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-610511843622686196/original/4eda0c37-8f06-4b98-9969-44d5799be971.jpeg ',
        preview: true
      },

      // SpotID: 10 | Owned by Sam
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/c16b8fb0-e296-435f-8247-cd375e780963.jpg ',
        preview: true
      },

      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53060647/original/cf9d1679-343d-4444-9f64-93d3484c297e.jpeg ',
        preview: true
      },

      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53060647/original/43814b22-f06d-4edb-824a-dc1ee218bda4.jpeg ',
        preview: true
      },

      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53060647/original/774802ad-6536-45c0-b407-0e0aa8f83b43.jpeg ',
        preview: true
      },

      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53060647/original/da4c9544-742e-42ec-947b-b1b501166377.jpeg ',
        preview: true
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
