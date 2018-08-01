const Sequelize = require('sequelize');
const db = require('../db');

const Refrigerator = db.define('refrigerator', {
  expirationDate: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Refrigerator;
