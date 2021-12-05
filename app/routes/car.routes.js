module.exports = app => {
  const cars = require("../controllers/car.controller.js");

  var router = require("express").Router();

  // Retrieve all cars
  router.get("/cars", cars.findAll);

  // Create a new car
  router.post("/car", cars.create);

 




  

  // Retrieve a single car with id
  router.get("car/:immatriculation", cars.findOne);

  // Update a car with id
  router.put("car/:immatriculation", cars.update);

  // Delete a car with id
  router.delete("car/:immatriculation", cars.delete);









  // Retrieve all published cars
  router.get("/published", cars.findAllPublished);

  // Create a new car
  router.delete("/", cars.deleteAll);

  app.use("/api/projet", router);
};
