'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        email: 'admin99@gmail.com',
        password: 'root',
      },
      {
        email: 'fulano99@gmail.com',
        password: 'root',
      },
      {
        email: 'fulano98@gmail.com',
        password: 'root',
      },      {
        email: 'fulano97@gmail.com',
        password: 'root',
      },      {
        email: 'fulano96@gmail.com',
        password: 'root',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
