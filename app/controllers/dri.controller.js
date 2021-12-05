const db = require("../models");
const Dri = db.dris;

// Create and Save a new Dri
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Dri
  const dri = new Dri({
    nom: req.body.nom,
    prenom: req.body.prenom,
    voiture: req.body.voiture,
    
  });

  // Save dri in the database
  dri
    .save(dri)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Dri."
      });
    });
};

// Retrieve all Dris from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};

  Dri.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dris."
      });
    });
};

// Find a single dri with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Dri.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Dri with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Dri with id=" + id });
    });
};

// Update a Dri by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Dri.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Dri with id=${id}. Maybe Dri was not found!`
        });
      } else res.send({ message: "Dri was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Dri with id=" + id
      });
    });
};

// Delete a Dri with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Dri.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Dri with id=${id}. Maybe Dri was not found!`
        });
      } else {
        res.send({
          message: "Dri was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Dri with id=" + id
      });
    });
};









// Delete all Dris from the database.
exports.deleteAll = (req, res) => {
  Dri.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Dris were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all dris."
      });
    });
};

// Find all published dris
exports.findAllPublished = (req, res) => {
  Dri.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dris."
      });
    });
};
