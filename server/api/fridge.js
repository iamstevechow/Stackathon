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
    let expiration;
    if (req.body.expirationDate) {
      expiration = new Date(
        req.body.expirationYear,
        req.body.expirationMonth,
        req.body.expirationDate
      );
    } else {
      const ingredient = await Ingredient.findById(req.body.ingredientId);
      let today = new Date();
      expiration = addDays(today, ingredient.expiration);
    }
    await Fridge.create({
      quantity: req.body.quantity,
      userId: req.body.userId,
      ingredientId: req.body.ingredientId,
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
