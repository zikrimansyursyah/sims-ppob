"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_balance_histories", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      transaction_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "transactions",
          key: "id",
        },
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      balance_before: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      balance_after: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });

    await queryInterface.addConstraint("user_balance_histories", {
      fields: ["type"],
      type: "check",
      name: "chk_balance_histories_type",
      where: {
        type: ["CREDIT", "DEBIT"],
      },
    });
    await queryInterface.addConstraint("user_balance_histories", {
      fields: ["amount"],
      type: "check",
      name: "chk_balance_histories_amount",
      where: Sequelize.literal("amount >= 0"),
    });
    await queryInterface.addConstraint("user_balance_histories", {
      fields: ["balance_before"],
      type: "check",
      name: "chk_balance_histories_balance_before",
      where: Sequelize.literal("balance_before >= 0"),
    });
    await queryInterface.addConstraint("user_balance_histories", {
      fields: ["balance_after"],
      type: "check",
      name: "chk_balance_histories_balance_after",
      where: Sequelize.literal("balance_after >= 0"),
    });

    await queryInterface.addIndex("user_balance_histories", ["user_id"]);
    await queryInterface.addIndex("user_balance_histories", ["transaction_id"]);
    await queryInterface.addIndex("user_balance_histories", ["created_at"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_balance_histories");
  },
};
