"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    static associate(models) {
      Transactions.belongsTo(models.Users, { foreignKey: "user_id", as: "user" });
      Transactions.belongsTo(models.Services, { foreignKey: "service_id", as: "service" });
      Transactions.hasMany(models.UserBalanceHistory, { foreignKey: "transaction_id", as: "balance_histories" });
    }
  }

  Transactions.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      service_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      invoice_number: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      transaction_type: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      transaction_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      balance_before: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      balance_after: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      service_code_snapshot: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      service_name_snapshot: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      service_tariff_snapshot: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
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
      tableName: "transactions",
      modelName: "Transactions",
      underscored: true,
      paranoid: false,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return Transactions;
};
