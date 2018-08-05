const router = require('express').Router();
const axios = require('axios');

const Clarifai = require('clarifai');

const cloudinary = require('cloudinary')

module.exports = router;

router.put('/', async (req, res, next) => {
  try {
    const app = new Clarifai.App({
      apiKey: process.env.CLARIFAI
    });
    const result = await cloudinary.uploader.upload(req.body.img,
function(result) { console.log(result) })

    app.models
      .predict(
        'bd367be194cf45149e75f01d59f77ba7',
        result.url
      )
      .then(
        function(response) {
          console.log(response.outputs);
          res.send(response.outputs);
        },
        function(err) {
          console.log(err);
          res.sendStatus(200);
        }
      );
  } catch (err) {
    next(err);
  }
});
