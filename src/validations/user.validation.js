const Joi = require("joi");
const { ID } = require("./lib.messages");
const { firstNameSchema, lastNameSchema } = require("./auth.validation");

const updateProfileSchema = Joi.object({
  first_name: firstNameSchema,
  last_name: lastNameSchema,
})
  .required()
  .messages(ID);

module.exports = {
  updateProfileSchema,
};
