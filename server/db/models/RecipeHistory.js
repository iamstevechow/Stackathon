const Sequelize = require('sequelize');
const db = require('../db');

const RecipeHistory = db.define('recipe_history', {
  cookingDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      min: 0
    }
  }
});

module.exports = RecipeHistory;
