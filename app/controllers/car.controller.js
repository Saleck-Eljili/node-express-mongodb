const db = require("../models");
const Car = db.cars;

// Create and Save a new Car
exports.create = (req, res) => {
  // Validate request
  if (!req.body.immatriculation) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Car
  const car = new Car({
    immatriculation: req.body.immatriculation,
    modele: req.body.modele,
    marque: req.body.marque,
    
  });

  // Save Car in the database
  car
    .save(car)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Car."
      });
    });
};

// Retrieve all Cars from the database.
exports.findAll = (req, res) => {
  const immatriculation = req.query.immatriculation;
  var condition = immatriculation ? { immatriculation: { $regex: new RegExp(immatriculation), $options: "i" } } : {};

  Car.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cars."
      });
    });
};

// Find a single Car with an immatriculation
exports.findOne = (req, res) => {
  const immatriculation = req.params.immatriculation;

  Car.findByImmatriculation(immatriculation)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Car with immatriculation " + immatriculation });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Car with immatriculation=" + immatriculation });
    });
};

// Update a Car by the immatriculation in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const immatriculation = req.params.immatriculation;

  Car.findByImmatriculationAndUpdate(immatriculation, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Car with immatriculation=${immatriculation}. Maybe Car was not found!`
        });
      } else res.send({ message: "Car was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Car with immatriculation=" + immatriculation
      });
    });
};

// Delete a Car with the specified immatriculation in the request
exports.delete = (req, res) => {
  const immatriculation = req.params.immatriculation;

  Car.findByImmatriculationAndRemove(immatriculation, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Car with immatriculation=${immatriculation}. Maybe Car was not found!`
        });
      } else {
        res.send({
          message: "Car was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Car with immatriculation=" + immatriculation
      });
    });
};









// Delete all Cars from the database.
exports.deleteAll = (req, res) => {
  Car.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Cars were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cars."
      });
    });
};

// Find all published Cars
exports.findAllPublished = (req, res) => {
  Car.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cars."
      });
    });
};
