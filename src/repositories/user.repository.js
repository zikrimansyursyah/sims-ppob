const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const findByEmail = async (email, isActive, options = { columns: [], transaction: undefined }) => {
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

const updateAfterLogin = async (userId, options = { columns: [], transaction: undefined }) => {
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

const createNewUser = async (data = { email: "", password: "", role: "", first_name: "", last_name: "", profile_image: "", is_active: true }, options = { transaction: undefined }) => {
  return await sequelize
    .query(
      `INSERT INTO users (role, email, password, first_name, last_name, profile_image_url, is_active, created_at, created_by) VALUES
    (:role,:email,:password,:first_name,:last_name,:profile_image,:is_active, NOW(), 1) RETURNING id;`,
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
    )
    .then((data) => data?.[0] || null);
};

const updateUserDataById = async (
  userId,
  data = { email: "", password: "", role: "", first_name: "", last_name: "", profile_image: "", is_active: true },
  options = { columns: [], transaction: undefined },
) => {
  return await sequelize.query(
    `UPDATE users
    SET
      updated_by = :user_id,
      updated_at = NOW()
      ${data.email !== undefined ? ",email = :email" : ""}
      ${data.password !== undefined ? ",password = :password" : ""}
      ${data.role !== undefined ? ",role = :role" : ""}
      ${data.first_name !== undefined ? ",first_name = :first_name" : ""}
      ${data.last_name !== undefined ? ",last_name = :last_name" : ""}
      ${data.profile_image !== undefined ? ",profile_image_url = :profile_image" : ""}
      ${data.is_active !== undefined ? ",is_active = :is_active" : ""}
    WHERE id = :user_id;`,
    {
      type: QueryTypes.UPDATE,
      replacements: {
        role: data.role,
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        profile_image: data.profile_image,
        is_active: Boolean(data.is_active),
        user_id: userId,
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
  updateUserDataById,
};
