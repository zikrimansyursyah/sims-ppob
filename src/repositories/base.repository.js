const { sequelize } = require("../models");

const startTransaction = async () => {
  return await sequelize.transaction();
};

const rollbackTransaction = async (transaction) => {
  await transaction.rollback();
};

const commitTransaction = async (transaction) => {
  await transaction.commit();
};

module.exports = {
  startTransaction,
  rollbackTransaction,
  commitTransaction,
};
