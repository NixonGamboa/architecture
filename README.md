# RetoNodeJsSofkaU

Collection Postman: "./RetoNodeApi.postman_collection"

uri base: http://localhost:3000

Services:

CREATE an animal (POST)http://localhost:3000/api/animals
    body: {
      "specie":"simmental",
      "color":"black",
      "isVaccinated":false,
      "gender":"male",
      "pastureId": 1 }

UPDATE an animal (PUT)http://localhost:3000/api/animals/<animalId>
    body: {
      "specie":"holstein",
      "color":"white and black",
      "isVaccinated":true,
      "gender":"female",
      "pastureId": 2 }
    
GET animal by Id (GET)http://localhost:3000/api/animals/<animalId>

GET all animals (GET)http://localhost:3000/api/animals

DELETE an animal (DELETE)http://localhost:3000/api/animals/<animalId>

UPDATE an animal field (PATCH)http://localhost:3000/api/animals/<animalId>/vaccinate
    body: { "isVaccinated":true }
    
GET animals by pasture (GET)http://localhost:3000/api/animals/by-pasture

GET list vaccinate by pasture (GET)http://localhost:3000/api/animals/is-vaccinated/?value=true
      (value is optional, default:true)
