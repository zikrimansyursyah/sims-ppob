const formatSchemaError = (error) => {
  return error.details.map((item) => ({
    field: item.path.join("."),
    message: item.message,
  }));
};

const generateInvoiceNumber = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());
  const suffix = String(now.getTime()).slice(-3).padStart(3, "0");
  return `INV${day}${month}${year}-${suffix}`;
};

module.exports = {
  formatSchemaError,
  generateInvoiceNumber,
};
