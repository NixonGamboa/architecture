const axios = require('axios');

const { MongoClient, ObjectId } = require('mongodb');


const repository = require('../src/lib/mongo');
const collection = 'animals';

const { makeFakeAnimal } = require('./fakes/animal');

describe('animals API', () => {
  beforeAll(() => {
    axios.defaults.baseURL = 'http://localhost:3000/api/animals';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.validateStatus = function (status) {
      // Throw only if the status code is greater than or equal to 500
      return status < 500;
    };
  });
  afterAll(async () => {
    return await repository.drop('animals');
  });

  describe('crud animals test', () => {
    it('create an animal successfully', async () => {
      const animal = {
        specie: 'cow-taurus',
        color: 'black',
        isVaccinated: true,
        gender: 'female',
      };
      const response = await axios.post('/', makeFakeAnimal(animal));
      const returnedId = response.data.dataId;
      const fromDb = await repository.getById(collection, returnedId);
      const expectedValue = { _id: returnedId, ...animal };
      expect(response.status).toBe(201);
      expect(response.data.message).toBe('animal created');
      expect(response.data.dataId).toMatch(/^[0-9a-fA-F]{24}$/);
      expect(JSON.stringify(fromDb)).toBe(JSON.stringify(expectedValue));
    });

    it('get all animals successfully', async () => {
      await repository.drop('animals');
      const animalOne = {
        specie: 'cow-taurus',
        color: 'black',
        isVaccinated: true,
        gender: 'female',
      };
      const animalTwo = {
        specie: 'cow-simental',
        color: 'white',
        isVaccinated: true,
        gender: 'female',
      };
      animals = [animalOne, animalTwo];
      await repository.createMany(collection, animals);
      const response = await axios.get('/');
      const returnedData = response.data.data;
      const expectedValue = [animalOne, animalTwo];
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('animals listed');
      expect(returnedData[0]._id).toMatch(/^[0-9a-fA-F]{24}$/);
      expect(returnedData[0].specie).toBe(expectedValue[0].specie)
      expect(returnedData[0].color).toBe(expectedValue[0].color)
      expect(returnedData[0].isVaccinated).toBe(expectedValue[0].isVaccinated)
      expect(returnedData[0].gender).toBe(expectedValue[0].gender)
      expect(returnedData[1]._id).toMatch(/^[0-9a-fA-F]{24}$/);
      expect(returnedData[1].specie).toBe(expectedValue[1].specie)
      expect(returnedData[1].color).toBe(expectedValue[1].color)
      expect(returnedData[1].isVaccinated).toBe(expectedValue[1].isVaccinated)
      expect(returnedData[1].gender).toBe(expectedValue[1].gender)
    });
    it('get an animal by id successfully', async () => {
      await repository.drop('animals');
      const animal = {
        specie: 'horse',
        color: 'brown',
        isVaccinated: true,
        gender: 'male',
      };
      const idCreated = await repository.create(collection, animal);
      const response = await axios.get('/'+idCreated);
      console.log(response.data)
      const returnedData = response.data;
      expect(response.status).toBe(200);
      expect(returnedData.message).toBe('animal retrived');
      expect(returnedData.data._id).toMatch(/^[0-9a-fA-F]{24}$/);
      expect(returnedData.data.specie).toBe(animal.specie)
      expect(returnedData.data.color).toBe(animal.color)
      expect(returnedData.data.isVaccinated).toBe(animal.isVaccinated)
      expect(returnedData.data.gender).toBe(animal.gender)
    });
  });
});


