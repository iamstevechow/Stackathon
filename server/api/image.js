const router = require('express').Router();
const axios = require('axios');

module.exports = router;

router.put('/', async (req, res, next) => {
  try {
    let config = {
      key: process.env.IMAGGA_KEY,
      secret: process.env.IMAGGA_SECRET
    };
    let uploadImgUrl =
      'https://' +
      config.key +
      ':' +
      config.secret +
      '@api.imagga.com/v1/tagging?url=' +
      req.body.img;
    console.log(uploadImgUrl);
    let response = await axios.get(uploadImgUrl);
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});
