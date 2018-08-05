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

router.put('/new', async (req, res, next) => {
  try {
    // req.body.userId is userId
    // req.body.ingredients is array of ingredients (maybe names? or ids?)
    // should be filled with fridge items from user

    // need to find all recipes that match the ingredients most closely
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

router.put('/edamame', async (req, res, next) => {
  try {
    const recipes = req.body.q
      ? await axios.get(
          `https://api.edamam.com/search?q=${req.body.q}&app_id=${
            process.env.EDAMAM_APP_ID
          }&app_key=${process.env.EDAMAM_APP_KEY}`
        )
      : `https://api.edamam.com/search?app_id=${
          process.env.EDAMAM_APP_ID
        }&app_key=${process.env.EDAMAM_APP_KEY}`;
    res.json(recipes.data.hits);
  } catch (err) {
    next(err);
  }
});

router.put('/add', async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create({
      edamameId: req.body.edamameId,
      label: req.body.label,
      image: req.body.image,
      url: req.body.url
    });
    await SavedRecipe.create({
      userId: req.body.userId,
      recipeId: newRecipe.id
    });
    const savedRecipes = await SavedRecipe.findAll({
      where: { userId: req.body.userId },
      include: [{ model: Recipe }]
    });
    res.json(savedRecipes);
  } catch (err) {
    next(err);
  }
});

router.put('/remove', async (req, res, next) => {
  try {
    const arr = req.body.arr;
    const promiseArr = [];
    arr.forEach(elem => {
      promiseArr.push(SavedRecipe.destroy({ where: { id: elem } }));
    });
    await Promise.all(promiseArr);
    const savedRecipes = await SavedRecipe.findAll({
      where: { userId: req.body.userId },
      include: [{ model: Recipe }]
    });
    res.json(savedRecipes);
  } catch (err) {
    next(err);
  }
});
