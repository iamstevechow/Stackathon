const router = require('express').Router();
const { Fridge, Ingredient } = require('../db/models');
module.exports = router;

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

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

router.put('/add', async (req, res, next) => {
  try {
    let ingredient;
    if (req.body.ingredientId) {
      ingredient = await Ingredient.findById(req.body.ingredientId);
    } else {
      ingredient = await Ingredient.findOne({
        where: {
          name: req.body.ingredientName
        }
      });
    }
    if (!ingredient) {
      ingredient = await Ingredient.create({
        name: req.body.ingredientName,
        image: 'test',
        expiration: 3,
        image: req.body.url
      });
    }
    let today = new Date();
    let expiration =
      req.body.expirationTime || req.body.expirationTime === 0
        ? addDays(today, req.body.expirationTime)
        : addDays(today, ingredient.expiration);
    await Fridge.create({
      quantity: req.body.quantity,
      userId: req.body.userId,
      ingredientId: ingredient.id,
      expirationDate: expiration
    });
    const fridge = await Fridge.findAll({
      where: {
        userId: req.body.userId
      },
      include: [{ model: Ingredient }]
    });
    res.json(fridge);
  } catch (err) {
    next(err);
  }
});

router.put('/remove', async (req, res, next) => {
  try {
    const arr = req.body.arr;
    const promiseArr = [];
    arr.forEach(elem => {
      promiseArr.push(Fridge.destroy({ where: { id: elem } }));
    });
    await Promise.all(promiseArr);
    const fridge = await Fridge.findAll({
      where: {
        userId: req.body.userId
      },
      include: [{ model: Ingredient }]
    });
    res.json(fridge);
  } catch (err) {
    next(err);
  }
});
