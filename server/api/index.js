const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/fridge', require('./fridge'));
router.use('/recipe', require('./recipe'));
router.use('/ingredient', require('./ingredient'));
router.use('/image', require('./image'));
router.use('/history', require('./history'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
