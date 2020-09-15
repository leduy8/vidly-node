const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 20 },
});
const Genre = mongoose.model("Genre", genreSchema);

function validateGenres(genre) {
  const schema = Joi.object({ name: Joi.string().min(5).max(20).required() });
  return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenres;
