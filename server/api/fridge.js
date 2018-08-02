const router = require('express').Router();
const { Fridge, Ingredient } = require('../db/models');
module.exports = router;

router.put('/', async (req, res, next) => {
  try {
    const fridge = await Fridge.findAll({
      where: {
        userId: req.body.id
      },
      include: [{ model: Ingredient }]
    });
    res.json(fridge);
  } catch (err) {
    next(err);
  }
});
