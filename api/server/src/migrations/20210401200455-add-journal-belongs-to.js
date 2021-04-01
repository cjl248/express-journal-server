'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Journals', 'UserId', {
       allowNull: false,
       type: Sequelize.INTEGER,
       references: {
         model: 'Users',
         key: 'id',
       },
       onUpdate: 'CASCADE',
       onDelete: 'SET NULL',
     })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('Journals', 'UserId')
  }
};
