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
  router.get('/:animalId', async (req, res, next) => {
    try {
      const animal = await Promise.resolve(animalsMock[0]);
      res.status(200).json({
        data: animal,
        message: 'animal retrived',
      });
    } catch (err) {
      next(err);
    }
  });
  router.post('/', async (req, res, next) => {
    try {
      const createdAnimalId = await Promise.resolve(animalsMock[0].id);
      res.status(201).json({
        data: createdAnimalId,
        message: 'animal created',
      });
    } catch (err) {
      next(err);
    }
  });
  router.put('/:animalId', async (req, res, next) => {
    try {
      const updatedAnimalId = await Promise.resolve(animalsMock[0].id);
      res.status(200).json({
        data: updatedAnimalId,
        message: 'animal updated',
      });
    } catch (err) {
      next(err);
    }
  });
  router.delete('/:animalId', async (req, res, next) => {
    try {
      const deletedAnimalId = await Promise.resolve(animalsMock[0].id);
      res.status(200).json({
        data: deletedAnimalId,
        message: 'animal deleted',
      });
    } catch (err) {
      next(err);
    }
  });

}
module.exports = animalsApi;