const Ingredient = require('./Ingredient');
const Preference = require('./Preference');
const Refrigerator = require('./Refrigerator');
const RecipeHistory = require('./RecipeHistory');
const Recipe = require('./Recipe');
const User = require('./User');

User.belongsToMany(Ingredient, { through: Preference });
Ingredient.belongsToMany(User, { through: Preference });

User.belongsToMany(Ingredient, { through: Refrigerator });
Ingredient.belongsToMany(User, { through: Refrigerator });

User.belongsToMany(Recipe, { through: RecipeHistory });
Recipe.belongsToMany(User, { through: RecipeHistory });

User.belongsToMany(Recipe, { through: 'favorite_recipe' });
Recipe.belongsToMany(User, { through: 'favorite_recipe' });

module.exports = {
  Ingredient,
  Preference,
  Refrigerator,
  User
};
