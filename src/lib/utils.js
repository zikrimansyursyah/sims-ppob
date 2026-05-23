const formatSchemaError = (error) => {
  return error.details.map((item) => ({
    field: item.path.join("."),
    message: item.message,
  }));
};

module.exports = {
  formatSchemaError,
};
