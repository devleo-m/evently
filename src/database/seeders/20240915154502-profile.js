'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Profile', [
      {
        name: 'Leonardo Silva',
        bio: 'Desenvolvedor apaixonado por tecnologia e backend.',
        birth_date: '1995-10-08',
        user_id: 1,
      },
      {
        name: 'Maria Oliveira',
        bio: 'Professora e entusiasta de desenvolvimento web.',
        birth_date: '1992-04-16',
        user_id: 2,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profile', null, {});
  }
};
