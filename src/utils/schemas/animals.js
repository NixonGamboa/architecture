const joi = require('@hapi/joi');

const animalIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const animalSpecieSchema = joi.string().min(3).max(15);
const animalColorSchema = joi.string().min(4);
const animalsIsVaccinatedSchema = joi.boolean();
const animalsGenderSchema = joi.string();

const createAnimalSchema = {
  specie: animalSpecieSchema.required(),
  color: animalColorSchema.required(),
  isVaccinated: animalsIsVaccinatedSchema.required(),
  gender: animalsGenderSchema.required(),
};

module.exports = {
  animalIdSchema,
  createAnimalSchema,
};
