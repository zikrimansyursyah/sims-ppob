const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const getActiveBanners = async () => {
  return await sequelize.query(
    `SELECT name AS banner_name, image_url AS banner_image, description
     FROM banners
     WHERE is_active IS TRUE AND deleted_at IS NULL
     ORDER BY GREATEST(updated_at, created_at) DESC, name ASC;`,
    {
      type: QueryTypes.SELECT,
    },
  );
};

module.exports = {
  getActiveBanners,
};
