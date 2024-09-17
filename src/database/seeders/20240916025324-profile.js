'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profile', [
      {
        name: 'Fulano de Tal',
        bio: 'Lorem ipsunm',
        birth_date: new Date('1990-02-20'),
        user_id: 1,
      },
      {
        name: 'Beltrano de tal',
        bio: 'Lorem ipsum e b saas',
        birth_date: new Date('1988-07-11'),
        user_id: 2,
      },
      {
        name: 'Charlie Brown',
        bio: 'Lorm impsum .sa.s...',
        birth_date: new Date('1992-09-05'),
        user_id: 3,
      },
      {
        name: 'ghhss uusd',
        bio: 'asa lorem oumpis',
        birth_date: new Date('1985-12-30'),
        user_id: 4,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profile', null, {});
  }
};
