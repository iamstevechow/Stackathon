const router = require('express').Router();
const { SavedRecipe, Recipe } = require('../db/models');
module.exports = router;

router.put('/', async (req, res, next) => {
  try {
    const recipes = await SavedRecipe.findAll({
      where: { userId: req.body.id },
      include: [{ model: Recipe }]
    });
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});
