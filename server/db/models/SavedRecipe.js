const Sequelize = require('sequelize');
const db = require('../db');

const SavedRecipe = db.define('saved_recipe', {});

module.exports = SavedRecipe;
