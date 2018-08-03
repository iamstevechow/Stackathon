const router = require('express').Router();
const { SavedRecipe, Recipe } = require('../db/models');
const axios = require('axios');
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

router.put('/edamame', async (req, res, next) => {
  try {
    const recipes = await axios.get(
      `https://api.edamam.com/search?q=${req.body.q}&app_id=${
        process.env.EDAMAM_APP_ID
      }&app_key=${process.env.EDAMAM_APP_KEY}`
    );
    res.json(recipes.data.hits);
  } catch (err) {
    next(err);
  }
});
