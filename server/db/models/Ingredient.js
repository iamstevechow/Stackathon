const Sequelize = require('sequelize');
const db = require('../db');

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  expiration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Ingredient;
