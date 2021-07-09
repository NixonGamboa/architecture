const { query } = require('express');
const MongoLib = require('../lib/mongo');

class AnimalsService {
  constructor() {
    this.collection = 'animals';
    this.repository = new MongoLib();
  }
  async getAnimals({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const animals = await this.repository.getAll(this.collection, query);
    return animals || [];
  }
  async getAnimalById({ animalId }) {
    const animal = await this.repository.getById(this.collection, animalId);
    return animal || [];
  }
  async createAnimal({ animal }) {
    const createdAnimalId = await this.repository.create(
      this.collection,
      animal
    );
    return createdAnimalId;
  }
  async updateAnimal({ animalId, animal } = {}) {
    const updatedAnimal = await this.repository.update(
      this.collection,
      animalId,
      animal
    );
    return updatedAnimal;
  }
  async deleteAnimal({ animalId }) {
    const deletedAnimalId = await this.repository.delete(
      this.collection,
      animalId
    );
    return deletedAnimalId;
  }
}

module.exports = AnimalsService;
