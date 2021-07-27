const { query } = require('express');
const repository = require('../../infrastructure/lib/mongo');

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
  const updatedAnimal = await repository.update(collection, animalId, animal);
  return updatedAnimal;
}
async function vaccinateAnimal({ animalId, vaccinateAnimal } = {}) {
  const vaccinatedAnimal = await repository.update(
    collection,
    animalId,
    vaccinateAnimal
  );
  return vaccinatedAnimal;
}
async function deleteAnimal({ animalId }) {
  const deletedAnimalId = await repository.remove(collection, animalId);
  return deletedAnimalId;
}
async function getAnimalsByPasture() {
  const animals = await repository.getAll(collection);
  const pasturesIdsalls = animals.map((animal) => animal.pastureId);
  const pasturesIds = [...new Set(pasturesIdsalls)];
  const orderedAnimals = pasturesIds.map((pastureId) => {
    return animals.filter((animal) => animal.pastureId == pastureId);
  });
  return orderedAnimals || [];
}
async function vaccinatedAnimalsList({ tags }) {
  const eval = !(tags.value=="false")
  const animalsByPasture = await getAnimalsByPasture();
  const vaccinatedByPasture = animalsByPasture.map((pasture) => {
    return pasture.filter((animal) => animal.isVaccinated === eval
    );
  });
  return vaccinatedByPasture;
}
const animalsService = {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  vaccinateAnimal,
  deleteAnimal,
  getAnimalsByPasture,
  vaccinatedAnimalsList,
};
module.exports = animalsService;
