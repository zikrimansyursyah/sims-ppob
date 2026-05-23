const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const findByEmail = async (email, isActive, options = { columns: [], transaction }) => {
  return await sequelize.query(
    `SELECT ${(options.columns || []).length > 0 ? options.columns.join(",") : "*"}
    FROM users u
    WHERE u.email = :email AND u.deleted_at IS NULL${typeof isActive == "boolean" ? ` AND u.is_active IS ${isActive ? "TRUE" : "FALSE"}` : ""}
    LIMIT 1;`,
    {
      type: QueryTypes.SELECT,
      replacements: { email },
      plain: true,
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

const updateAfterLogin = async (userId, options = { columns: [], transaction }) => {
  return await sequelize.query(
    `UPDATE users
    SET last_login_at = NOW(), updated_by = :user_id, updated_at = NOW()
    WHERE id = :user_id;`,
    {
      type: QueryTypes.UPDATE,
      replacements: { user_id: userId },
      plain: true,
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

const createNewUser = async (data = { email: "", password: "", role: "", first_name: "", last_name: "", profile_image: "", is_active: true }, options = { transaction }) => {
  return await sequelize.query(
    `INSERT INTO users (role, email, password, first_name, last_name, profile_image_url, is_active, created_at, created_by) VALUES
    (:role,:email,:password,:first_name,:last_name,:profile_image,:is_active, NOW(), 1);`,
    {
      type: QueryTypes.INSERT,
      replacements: {
        role: data.role,
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        profile_image: data.profile_image,
        is_active: Boolean(data.is_active),
      },
      plain: true,
      ...(options.transaction && { transaction: options.transaction }),
    },
  );
};

module.exports = {
  findByEmail,
  updateAfterLogin,
  createNewUser,
};
