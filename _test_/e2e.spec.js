const axios = require('axios');
const { makeFakeAnimal } = require('./fakes/animal');
const MongoLib = require('../src/lib/mongo');
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
    const mongoLib = new MongoLib();
    return await mongoLib.drop('animals');
  });
  describe('create animals test', () => {
    it('animal created successfully', async () => {
      const animal = {
        specie: 'dog',
        color: 'black',
        isVaccinated: true,
        gender: 'male',
      };
      const response = await axios.post('/', makeFakeAnimal(animal));
      expect(response.status).toBe(201);
      expect(response.data.message).toBe('animal created');
      expect(response.data.dataId).toMatch(/^[0-9a-fA-F]{24}$/);
    });
  });
});
