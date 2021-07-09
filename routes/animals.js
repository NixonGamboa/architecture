const express = require('express');
const { animalsMock } = require("../utils/mocks/animals");

function animalsApi(app) {
  const router = express.Router();
  app.use('/api/animals', router);

  router.get('/', async (req, res, next) => {
    try {
      const animals = await Promise.resolve(animalsMock);
      res.status(200).json({
        data: animals,
        message: 'animals listed',
      });
    } catch (err) {
      next(err);
    }
  });
}
module.exports = animalsApi;