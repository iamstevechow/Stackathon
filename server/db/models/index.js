const Ingredient = require('./Ingredient');
const Preference = require('./Preference');
const Refrigerator = require('./Refrigerator');
const User = require('./User');

User.belongsToMany(Ingredient, { through: Preference });
Ingredient.belongsToMany(User, { through: Preference });

User.belongsToMany(Ingredient, { through: Refrigerator });
Ingredient.belongsToMany(User, { through: Refrigerator });

module.exports = {
  Ingredient,
  Preference,
  Refrigerator,
  User
};
