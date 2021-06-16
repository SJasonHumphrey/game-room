'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('regions', 
      [ 
        {
          name: 'Southeast',
          createdAt: new Date(),
          updatedAt: new Date() 
        },
        {
          name: 'NorthEast',
          createdAt: new Date(),
          updatedAt: new Date() 
        },
        {
          name: 'Eastcoast',
          createdAt: new Date(),
          updatedAt: new Date() 
        },
        {
          name: 'Midwest',
          createdAt: new Date(),
          updatedAt: new Date() 
        },
        {
          name: 'Southwest',
          createdAt: new Date(),
          updatedAt: new Date() 
        },
        {
          name: 'West',
          createdAt: new Date(),
          updatedAt: new Date() 
        }
      ], {});
    
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
