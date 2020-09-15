const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxlength: 25, required: true },
  isGold: { type: Boolean, default: false },
  phone: { type: String, minlength: 9, maxlength: 10, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomers(customer) {
  const schema = new Joi.object({
    name: Joi.string().min(3).max(25).required(),
    phone: Joi.string().min(9).max(10).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomers;
