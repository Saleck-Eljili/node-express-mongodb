module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nom: String,
      prenom: String,
      voiture:[{
        immatriculation: String,
        modele: String,
        marque: String
      }]
    
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Dri = mongoose.model("dri", schema);
  return Dri;
};
