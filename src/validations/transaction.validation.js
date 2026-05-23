const Joi = require("joi");
const { ID } = require("./lib.messages");

const topUpSchema = Joi.object({
  top_up_amount: Joi.number().integer().min(0).required(),
})
  .required()
  .messages(ID);

const paymentSchema = Joi.object({
  service_code: Joi.string().trim().uppercase().required(),
})
  .required()
  .messages(ID);

const transactionHistorySchema = Joi.object({
  offset: Joi.number().integer().min(0).default(0),
  limit: Joi.number().integer().min(1).default(10),
})
  .required()
  .messages(ID);

module.exports = {
  topUpSchema,
  paymentSchema,
  transactionHistorySchema,
};
