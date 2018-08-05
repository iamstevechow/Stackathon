const Sequelize = require('sequelize');
const db = require('../db');

const Recipe = db.define('recipe', {
  edamameId: {
    type: Sequelize.STRING
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Recipe;
