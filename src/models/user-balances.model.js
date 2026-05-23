"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserBalances extends Model {
    static associate(models) {
      UserBalances.belongsTo(models.Users, { foreignKey: "user_id", as: "user" });
    }
  }
  UserBalances.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      balance: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user_balances",
      modelName: "UserBalances",
      underscored: true,
      timestamps: true,
      createdAt: false,
      updatedAt: "updated_at",
    },
  );

  return UserBalances;
};
