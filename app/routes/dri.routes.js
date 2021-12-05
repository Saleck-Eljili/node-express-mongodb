module.exports = app => {
  const dris = require("../controllers/dri.controller.js");

  var router = require("express").Router();

  // Retrieve all drivers
  router.get("/drivers", dris.findAll);

  // Create a new dri
  router.post("/driver", dris.create);

  // Retrieve a single dri with id
  router.get("/driver/:id", dris.findOne);

  // Update a dri with id
  router.put("/driver/:id", dris.update);

  // Delete a dri with id
  router.delete("/driver/:id", dris.delete);






  // Retrieve all published dris
  router.get("/published", dris.findAllPublished);

  // Create a new dri
  router.delete("/", dris.deleteAll);

  app.use("/api/projet", router);
};
