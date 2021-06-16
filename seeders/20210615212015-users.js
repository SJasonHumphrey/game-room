
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('users', 
     [
      {
        username: 'MAC',
        email: 'jasonmcelvain@gmail.com',
        password: '1234',
        points: 300,
        regionID: 1, 
        createdAt: new Date(),
        updatedAt: new Date() 
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
