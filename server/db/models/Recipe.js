const Sequelize = require('sequelize');
const db = require('../db');

const Recipe = db.define('recipe', {
  edamameId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Recipe;
