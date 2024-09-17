'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Event', [
      {
        title: 'Festival legalzao',
        description: 'Uma super mega festivalzao e bla bla bla',
        event_date: '02/04/2023',
        creator_id: 1,  // Criador do evento
      },
      {
        title: 'Workshop e tals',
        description: 'Um workshop pratico para aprender muita coisa',
        event_date: '09/09/2024',
        creator_id: 2,
      },
      {
        title: 'Mega evento',
        description: 'Uma maratona de eventos tops',
        event_date: '01/01/2025',
        creator_id: 3,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Event', null, {});
  }
};
