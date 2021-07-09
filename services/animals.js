const { animalsMock } = require('../utils/mocks/animals');

class AnimalsService {
  async getAnimals() {
    const animals = await Promise.resolve(animalsMock);
    return animals || [];
  }
  async getAnimalById() {
    const animal = await Promise.resolve(animalsMock[0]);
    return animal || [];
  }
  async createAnimal() {
    const createdAnimalId = await Promise.resolve(animalsMock[0].id);
    return createdAnimalId;
  }
  async updateAnimal() {
    const updatedAnimal = await Promise.resolve(animalsMock[0].id);
    return updatedAnimal;
  }
  async deleteAnimal() {
    const deletedAnimalId = await Promise.resolve(animalsMock[0].id);
    return deletedAnimalId;
  }
}

module.exports = AnimalsService;
