'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Participations', [
      {
        user_id: 1,
        event_id: 1,
      },
      {
        user_id: 2,
        event_id: 1, 
      },
      {
        user_id: 1,
        event_id: 2, 
      },
      {
        user_id: 3,
        event_id: 1, 
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Participations', null, {});
  }
};
