const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
    trim: true,
  },
  numberInStock: { type: Number, min: 0, max: 255, required: true },
  dailyRentalRate: { type: Number, min: 0, max: 255, required: true },
  genre: { type: genreSchema, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovies(movie) {
  const schema = new Joi.object({
    title: Joi.string().min(3).max(255).required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
    genreId: Joi.objectId().required(),
  });
  return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovies;
