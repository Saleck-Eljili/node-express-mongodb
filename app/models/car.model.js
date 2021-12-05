module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      immatriculation: String,
      modele: String,
      marque: String
    
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Car = mongoose.model("car", schema);
  return Car;
};
