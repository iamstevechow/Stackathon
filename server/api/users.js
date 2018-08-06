const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const newUser = await User.findById(req.body.id);
    let firstName =
      req.body.firstName[0].toUpperCase() + req.body.firstName.slice(1);
    let lastName =
      req.body.lastName[0].toUpperCase() + req.body.lastName.slice(1);
    await newUser.update({
      firstName: firstName,
      lastName: lastName
    });
    res.send(newUser);
  } catch (err) {
    next(err);
  }
});
