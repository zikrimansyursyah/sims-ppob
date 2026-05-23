"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_balances", {
      user_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      balance: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint("user_balances", {
      fields: ["balance"],
      type: "check",
      name: "chk_user_balances_balance",
      where: Sequelize.literal("balance >= 0"),
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_balances");
  },
};
