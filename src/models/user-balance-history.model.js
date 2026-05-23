"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserBalanceHistory extends Model {
    static associate(models) {
      UserBalanceHistory.belongsTo(models.Users, { foreignKey: "user_id", as: "user" });
      UserBalanceHistory.belongsTo(models.Transactions, { foreignKey: "transaction_id", as: "transaction" });
    }
  }

  UserBalanceHistory.init(
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
      transaction_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      amount: {
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user_balance_histories",
      modelName: "UserBalanceHistory",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    },
  );

  return UserBalanceHistory;
};
