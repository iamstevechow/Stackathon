const router = require('express').Router();
const axios = require('axios');

const Clarifai = require('clarifai');

const cloudinary = require('cloudinary');

module.exports = router;

router.put('/', async (req, res, next) => {
  try {
    let base64 = req.body.blob
    cloudinary.uploader.upload(base64, result => {
      console.log(result);
      const app = new Clarifai.App({
        apiKey: process.env.CLARIFAI
      });
      app.models.predict('bd367be194cf45149e75f01d59f77ba7', result.url).then(
        function(response) {
          res.send({value: response.outputs, url:result.url});
        },
        function(err) {
          console.log(err);
          res.sendStatus(200);
        }
      );
    });
  } catch (err) {
    next(err);
  }
});
