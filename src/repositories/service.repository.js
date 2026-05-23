const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const getActiveServices = async () => {
  return await sequelize.query(
    `SELECT code AS service_code, name AS service_name, icon_url AS service_icon, tariff AS service_tariff
     FROM services
     WHERE is_active IS TRUE AND deleted_at IS NULL
     ORDER BY GREATEST(updated_at, created_at) DESC, name ASC;`,
    {
      type: QueryTypes.SELECT,
    },
  );
};

const findServiceByCode = async (serviceCode, options = { transaction: undefined }) => {
  return await sequelize.query(
    `SELECT id, code, name, tariff
     FROM services
     WHERE UPPER(code) = :service_code
       AND is_active IS TRUE
       AND deleted_at IS NULL
     LIMIT 1;`,
    {
      type: QueryTypes.SELECT,
      replacements: { service_code: serviceCode },
      plain: true,
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

module.exports = {
  getActiveServices,
  findServiceByCode,
};
