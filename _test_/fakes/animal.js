const makeFakeAnimal = (info) => {
  const animal = {
    specie: info.specie,
    color: info.color,
    isVaccinated: info.isVaccinated,
    gender: info.gender,
    pastureId: info.pastureId,
  };
  return animal;
};
module.exports = { makeFakeAnimal };
