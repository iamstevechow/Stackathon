const Sequelize = require('sequelize');
const db = require('../db');

const Preference = db.define('preference', {
  preference: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Preference;
