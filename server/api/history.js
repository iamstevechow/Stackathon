const router = require('express').Router();
const { RecipeHistory, Recipe } = require('../db/models');
module.exports = router;

router.put('/', async (req, res, next) => {
  try {
    const history = await RecipeHistory.findAll({where: {
      userId: req.body.id
    },       include: [{ model: Recipe }]});
    res.json(history);
  } catch (err) {
    next(err);
  }
});

router.put('/add', async (req, res, next) => {
  try {
    const today = new Date()
    if (req.body.recipeId) {
      await RecipeHistory.create({
        cookingDate: today,
        userId: req.body.userId,
        recipeId: req.body.recipeId
      });
    } else {
      const newRecipe = await Recipe.create({
        edamameId: req.body.edamameId,
        label: req.body.label,
        image: req.body.image,
        url: req.body.url
      });
      await RecipeHistory.create({
        cookingDate: today,
        userId: req.body.userId,
        recipeId: newRecipe.id
      });
    }
    const recipeHistory = await RecipeHistory.findAll({where: {
      userId: req.body.userId
    },       include: [{ model: Recipe }]});
    res.json(recipeHistory);
  } catch (err) {
    next(err);
  }
});