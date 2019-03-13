'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'facebookId', Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'facebookId');
  }
};
