const axios = require('axios');

const { MongoClient, ObjectId } = require('mongodb');

const repository = require('../src/lib/mongo');
const collection = 'animals';

const { makeFakeAnimal } = require('./fakes/animal');

const time = 10000;

const animalsMock = [
  {
    specie: 'simental',
    color: 'black',
    isVaccinated: true,
    gender: 'female',
    pastureId: 1,
  },
  {
    specie: 'Brangus',
    color: 'black and withe',
    isVaccinated: false,
    gender: 'female',
    pastureId: 1,
  },
  {
    specie: 'Brngus',
    color: 'blck',
    isVaccinated: false,
    gender: 'femle',
    pastureId: 2,
  },

  {
    specie: 'horse',
    color: 'brown',
    isVaccinated: true,
    gender: 'male',
    pastureId: 2,
  },
];

describe('animals API', () => {
  beforeAll(() => {
    axios.defaults.baseURL = 'http://localhost:3000/api/animals';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.validateStatus = function (status) {
      // Throw only if the status code is greater than or equal to 500
      return status < 500;
    };
  });
  afterEach(async () => {
    return await repository.drop('animals');
  });

  describe('crud animals test', () => {
    it(
      'POST create an animal successfully',
      async () => {
        const animal = animalsMock[0];
        const response = await axios.post('/', makeFakeAnimal(animal));
        const returnedId = response.data.dataId;
        const fromDb = await repository.getById(collection, returnedId);
        const expectedValue = { _id: returnedId, ...animal };
        expect(response.status).toBe(201);
        expect(response.data.message).toBe('animal created');
        expect(response.data.dataId).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(JSON.stringify(fromDb)).toBe(JSON.stringify(expectedValue));
      },
      time
    );

    it(
      'GET get all animals successfully',
      async () => {
        const animalOne = animalsMock[0];
        const animalTwo = animalsMock[1];
        animals = [animalOne, animalTwo];
        await repository.createMany(collection, animals);
        const response = await axios.get('/');
        const returnedData = response.data.data;
        const expectedValue = [animalOne, animalTwo];
        expect(response.status).toBe(200);
        expect(response.data.message).toBe('animals listed');
        expect(returnedData[0]._id).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(returnedData[0].specie).toBe(expectedValue[0].specie);
        expect(returnedData[0].color).toBe(expectedValue[0].color);
        expect(returnedData[0].isVaccinated).toBe(
          expectedValue[0].isVaccinated
        );
        expect(returnedData[0].gender).toBe(expectedValue[0].gender);
        expect(returnedData[1]._id).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(returnedData[1].specie).toBe(expectedValue[1].specie);
        expect(returnedData[1].color).toBe(expectedValue[1].color);
        expect(returnedData[1].isVaccinated).toBe(
          expectedValue[1].isVaccinated
        );
        expect(returnedData[1].gender).toBe(expectedValue[1].gender);
      },
      time
    );

    it(
      'GET get an animal by id successfully',
      async () => {
        const animal = animalsMock[1];
        const idCreated = await repository.create(collection, animal);
        const response = await axios.get('/id/' + idCreated);
        const returnedData = response.data;
        expect(response.status).toBe(200);
        expect(returnedData.message).toBe('animal retrived');
        expect(returnedData.data._id).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(returnedData.data.specie).toBe(animal.specie);
        expect(returnedData.data.color).toBe(animal.color);
        expect(returnedData.data.isVaccinated).toBe(animal.isVaccinated);
        expect(returnedData.data.gender).toBe(animal.gender);
      },
      time
    );
    it(
      'PUT update an animal successfully',
      async () => {
        //arrange
        const outdatedAnimal = animalsMock[0];
        const updatedAnimal = animalsMock[3];
        const responseId = await repository.create(collection, outdatedAnimal);
        //act
        const response = await axios.put(
          '/' + responseId,
          makeFakeAnimal(updatedAnimal)
        );
        const returnedId = response.data.dataId;
        //asserts
        const fromDb = await repository.getById(collection, returnedId);
        const expectedValue = { _id: returnedId, ...updatedAnimal };
        expect(response.status).toBe(200);
        expect(response.data.message).toBe('animal updated');
        expect(response.data.dataId).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(JSON.stringify(fromDb)).toBe(JSON.stringify(expectedValue));
      },
      time
    );
    it(
      'DELETE remove an animal from db successfully',
      async () => {
        //arrange
        const animal = animalsMock[3];
        const idCreated = await repository.create(collection, animal);
        //act
        const response = await axios.delete('/' + idCreated);
        const returnedData = response.data;
        //asserts
        const animalDeleted = await repository.getById(collection, idCreated);
        expect(response.status).toBe(200);
        expect(returnedData.message).toBe('animal deleted');
        expect(returnedData.dataId).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(returnedData.dataId).toBe(idCreated.toString());
        expect(animalDeleted).toBeNull();
      },
      time
    );
    it(
      'PATCH update vaccinate an animal successfully',
      async () => {
        //arrange
        const outdatedAnimal = animalsMock[1];
        const whitoutVaccinate = { ...outdatedAnimal, isVaccinated: false };
        const toUpdate = {
          isVaccinated: true,
        };
        const responseId = await repository.create(
          collection,
          whitoutVaccinate
        );
        //act
        const response = await axios.patch(
          '/' + responseId + '/vaccinate',
          makeFakeAnimal(toUpdate)
        );
        const returnedId = response.data.dataId;
        //asserts
        const fromDb = await repository.getById(collection, returnedId);
        expect(response.status).toBe(200);
        expect(response.data.message).toBe('vaccinated updated');
        expect(response.data.dataId).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(fromDb.isVaccinated).toBe(toUpdate.isVaccinated);
      },
      time
    );
    it(
      'GET get animals by pasture successfully',
      async () => {
        //arrange
        animals = animalsMock;
        const pasturesIdsalls = animals.map((animal) => animal.pastureId);
        const pasturesIds = [...new Set(pasturesIdsalls)];
        await repository.createMany(collection, animals);
        //act
        const response = await axios.get('/by-pasture');
        const returnedData = response.data.data;
        const returnedGroups = returnedData.map((group) => group[0].pastureId);
        //asserts
        expect(response.status).toBe(200);
        expect(response.data.message).toBe('animals by pastured listed');
        expect(returnedData[0][0]._id).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(returnedGroups).toStrictEqual(pasturesIds);
      },
      time
    );
    it(
      'GET get animals vaccinated by pasture successfully',
      async () => {
        //arrange
        const animalOne = { ...animalsMock[1], isVaccinated: false, pastureId:1 };
        const animalTwo =  { ...animalsMock[2], isVaccinated: true, pastureId:1 };
        const animalThree = { ...animalsMock[3], isVaccinated: true, pastureId:2 };
        const animals = [animalOne, animalTwo, animalThree];
        await repository.createMany(collection, animals);
        //act
        const response = await axios.get('/is-vaccinated');
        const returnedData = response.data.data;
        console.log(returnedData)
        //asserts
        expect(response.status).toBe(200);
        expect(response.data.message).toBe('animals vaccinated listed');
        expect(returnedData[0][0]._id).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(returnedData[0][0].isVaccinated).toBe(true);
        expect(returnedData[1][0].isVaccinated).toBe(true);
      },
      time
    );
  });
});
