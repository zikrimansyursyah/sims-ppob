"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      Services.hasMany(models.Transactions, { foreignKey: "service_id", as: "transactions" });
    }
  }
  Services.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      icon_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tariff: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "services",
      modelName: "Services",
      underscored: true,
      paranoid: false,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return Services;
};
