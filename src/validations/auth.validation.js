const Joi = require("joi");
const { ID } = require("./lib.messages");

const emailSchema = Joi.string()
  .email({ tlds: { allow: true } })
  .lowercase()
  .trim();
const passwordSchema = Joi.string().min(8).max(100);
const firstNameSchema = Joi.string().trim().min(2).max(50);
const lastNameSchema = Joi.string().trim().min(2).max(50);

const registerSchema = Joi.object({
  email: emailSchema.required(),
  first_name: firstNameSchema.required(),
  last_name: lastNameSchema.required(),
  password: passwordSchema.required(),
})
  .required()
  .messages(ID);

const loginSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
})
  .required()
  .messages(ID);

module.exports = {
  emailSchema,
  passwordSchema,
  firstNameSchema,
  lastNameSchema,
  registerSchema,
  loginSchema,
};
