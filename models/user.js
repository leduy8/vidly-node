const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxlength: 25, required: true },
  email: {
    type: String,
    unique: true,
    minlength: 6,
    maxlength: 50,
    required: true,
  },
  password: { type: String, minlength: 6, maxlength: 255, required: true },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUsers(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    password: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(50).required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUsers;
