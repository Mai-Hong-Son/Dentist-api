"use strict";
import moment from "moment";
import { encryption } from "../utils/security";
import faker from 'faker';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkInsert(
      "sys_users",
      [],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
