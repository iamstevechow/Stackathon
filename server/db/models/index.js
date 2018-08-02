const Ingredient = require('./Ingredient');
const Preference = require('./Preference');
const Fridge = require('./Fridge');
const RecipeHistory = require('./RecipeHistory');
const Recipe = require('./Recipe');
const SavedRecipe = require('./SavedRecipe');
const User = require('./User');

User.belongsToMany(Ingredient, { through: Preference });
Ingredient.belongsToMany(User, { through: Preference });

User.hasOne(Fridge);
Fridge.belongsTo(User);

Ingredient.hasMany(Fridge);
Fridge.belongsTo(Ingredient);

User.hasMany(RecipeHistory);
RecipeHistory.belongsTo(User);

Recipe.hasMany(RecipeHistory);
RecipeHistory.belongsTo(Recipe);

User.hasMany(SavedRecipe);
SavedRecipe.belongsTo(User);

Recipe.hasMany(SavedRecipe);
SavedRecipe.belongsTo(Recipe);

module.exports = {
  Ingredient,
  Preference,
  Fridge,
  Recipe,
  RecipeHistory,
  SavedRecipe,
  User
};
