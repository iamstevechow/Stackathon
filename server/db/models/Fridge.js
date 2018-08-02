const Sequelize = require('sequelize');
const db = require('../db');

const Fridge = db.define('fridge', {
  expirationDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Fridge;
