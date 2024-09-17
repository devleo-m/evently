'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);

    await queryInterface.bulkInsert('User', [
      {
        email: 'fulano@example.com',
        password: await bcrypt.hash('root', salt),
      },
      {
        email: 'beltrano@gmail.com',
        password: await bcrypt.hash('root', salt),
      },
      {
        email: 'ciclano@gmail.com',
        password: await bcrypt.hash('root', salt),
      },
      {
        email: 'test@example.com',
        password: await bcrypt.hash('password123', salt),
      },
      {
        email: 'admin@gmail.com',
        password: await bcrypt.hash('root', salt),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
