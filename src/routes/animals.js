const express = require('express');
const animalsService = require('../services/animals');

const {
  animalIdSchema,
  createAnimalSchema,
} = require('../utils/schemas/animals');
const validationHandler = require('../utils/middleware/validationHandler');

function animalsApi(app) {
  const router = express.Router();
  app.use('/api/animals', router);


  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const animals = await animalsService.getAnimals({ tags });
      res.status(200).json({
        data: animals,
        message: 'animals listed',
      });
    } catch (err) {
      next(err);
    }
  });
  router.get(
    '/:animalId',
    validationHandler({ animalId: animalIdSchema }, 'params'),
    async (req, res, next) => {
      const { animalId } = req.params;
      try {
        const animal = await animalsService.getAnimalById({ animalId });
        res.status(200).json({
          data: animal,
          message: 'animal retrived',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.post(
    '/',
    validationHandler(createAnimalSchema),
    async (req, res, next) => {
      const { body: animal } = req;
      try {
        const createdAnimalId = await animalsService.createAnimal({ animal });
        res.status(201).json({
          dataId: createdAnimalId,
          message: 'animal created',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.put(
    '/:animalId',
    validationHandler({ animalId: animalIdSchema }, 'params'),
    validationHandler(createAnimalSchema),
    async (req, res, next) => {
      const { animalId } = req.params;
      const { body: animal } = req;
      try {
        const updatedAnimalId = await animalsService.updateAnimal({
          animalId,
          animal,
        });
        res.status(200).json({
          dataId: updatedAnimalId,
          message: 'animal updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.delete(
    '/:animalId',
    validationHandler({ animalId: animalIdSchema }, 'params'),
    async (req, res, next) => {
      const { animalId } = req.params;
      try {
        const deletedAnimalId = await animalsService.deleteAnimal({ animalId });
        res.status(200).json({
          dataId: deletedAnimalId,
          message: 'animal deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}
module.exports = animalsApi;
