const router = require('express').Router();
const { Ingredient } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({});
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
});
