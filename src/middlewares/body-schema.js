const { RESPONSE_STATUS, HTTP_STATUS } = require("../config/constants");

// Validation request (Body, Params, Query) Schema
const validate =
  (type = "body", schema) =>
  (req, res, next) => {
    try {
      const allowedTypes = ["body", "params", "query"];
      if (!allowedTypes.includes(type)) {
        next(new Error("Tipe validasi schema tidak valid"));
      }

      const data = req[type];
      const { error, value } = schema.validate(data, { stripUnknown: true });

      if (error) {
        const errorData = new Error(error.details[0].message || "Parameter tidak sesuai");
        errorData.statusCode = HTTP_STATUS.BAD_REQUEST;
        errorData.appStatus = RESPONSE_STATUS.INVALID_PARAMETERS;
        next(errorData);
      }

      req[type] = value;

      next();
    } catch (error) {
      console.log("heres");
      next(error);
    }
  };

module.exports = {
  validate,
};
