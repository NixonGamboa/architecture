const { query } = require('express');
const repository = require('../lib/mongo');

const collection = 'animals';

async function getAnimals({ tags }) {
  const query = tags && { tags: { $in: tags } };
  const animals = await repository.getAll(collection, query);
  return animals || [];
}
async function getAnimalById({ animalId }) {
  const animal = await repository.getById(collection, animalId);
  return animal || [];
}
async function createAnimal({ animal }) {
  const createdAnimalId = await repository.create(collection, animal);
  return createdAnimalId;
}
async function updateAnimal({ animalId, animal } = {}) {
  const updatedAnimal = await repository.update(
    collection,
    animalId,
    animal
  );
  return updatedAnimal;
}
async function deleteAnimal({ animalId }) {
  const deletedAnimalId = await repository.remove(
    collection,
    animalId
  );
  return deletedAnimalId;
}
const animalsService={
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal
};
module.exports = animalsService;
