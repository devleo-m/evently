'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Event', [
      {
        title: 'Workshop de Desenvolvimento Fullstack',
        description: 'Um evento para aprender as melhores práticas de desenvolvimento web fullstack.',
        event_date: new Date('2024-11-10'),
        creator_id: 1,
      },
      {
        title: 'Conferência de Tecnologia da Informação',
        description: 'Discussão sobre as tendências emergentes em TI e inovação.',
        event_date: new Date('2024-12-05'),
        creator_id: 2,
      },
      {
        title: 'Meetup de Desenvolvedores Frontend',
        description: 'Encontro para compartilhar experiências com React e Vue.js.',
        event_date: new Date('2024-10-15'),
        creator_id: 3,
      },
      {
        title: 'Hackathon de Segurança Cibernética',
        description: 'Competições e desafios para explorar vulnerabilidades e defesas cibernéticas.',
        event_date: new Date('2024-11-20'),
        creator_id: 4,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Event', null, {});
  }
};
