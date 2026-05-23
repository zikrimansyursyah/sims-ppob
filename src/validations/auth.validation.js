const Joi = require("joi");
const { ID } = require("./lib.messages");

const emailSchema = Joi.string()
  .email({ tlds: { allow: true } })
  .lowercase()
  .trim()
  .required();
const passwordSchema = Joi.string().min(8).max(100).required();
const firstNameSchema = Joi.string().trim().min(2).max(50).required();
const lastNameSchema = Joi.string().trim().min(2).max(50).required();

const registerSchema = Joi.object({
  email: emailSchema,
  first_name: firstNameSchema,
  last_name: lastNameSchema,
  password: passwordSchema,
}).messages(ID);

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
}).messages(ID);

module.exports = {
  emailSchema,
  passwordSchema,
  firstNameSchema,
  lastNameSchema,
  registerSchema,
  loginSchema,
};
