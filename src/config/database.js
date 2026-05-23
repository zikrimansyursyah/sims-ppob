"use strict";
require("dotenv").config();
const {
  DB_HOST_LOCAL,
  DB_NAME_LOCAL,
  DB_USERNAME_LOCAL,
  DB_PASSWORD_LOCAL,
  DB_DIALECT_LOCAL,
  DB_HOST_DEVELOPMENT,
  DB_NAME_DEVELOPMENT,
  DB_USERNAME_DEVELOPMENT,
  DB_PASSWORD_DEVELOPMENT,
  DB_DIALECT_DEVELOPMENT,
  DB_HOST_PRODUCTION,
  DB_NAME_PRODUCTION,
  DB_USERNAME_PRODUCTION,
  DB_PASSWORD_PRODUCTION,
  DB_DIALECT_PRODUCTION,
  DB_PORT_PRODUCTION,
  DB_URL_PRODUCTION,
} = process.env;

module.exports = {
  local: {
    username: DB_USERNAME_LOCAL,
    password: DB_PASSWORD_LOCAL,
    database: DB_NAME_LOCAL,
    host: DB_HOST_LOCAL,
    dialect: DB_DIALECT_LOCAL,
    define: {
      timestamps: false,
    },
    timezone: "+07:00", // for writing to database
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  development: {
    username: DB_USERNAME_DEVELOPMENT,
    password: DB_PASSWORD_DEVELOPMENT,
    database: DB_NAME_DEVELOPMENT,
    host: DB_HOST_DEVELOPMENT,
    dialect: DB_DIALECT_DEVELOPMENT,
    define: {
      timestamps: false,
    },
    dialectOptions: {
      ssl: false,
    },
    timezone: "+07:00", // for writing to database
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    use_env_variable: "DB_URL_PRODUCTION",
    dialect: DB_DIALECT_PRODUCTION,
    define: {
      timestamps: false,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    timezone: "+07:00", // for writing to database
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
