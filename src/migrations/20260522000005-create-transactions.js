"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
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
      service_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "services",
          key: "id",
        },
      },
      invoice_number: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      transaction_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      transaction_status: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      total_amount: {
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
      service_code_snapshot: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      service_name_snapshot: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      service_tariff_snapshot: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      created_by: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint("transactions", {
      fields: ["transaction_type"],
      type: "check",
      name: "chk_transactions_type",
      where: {
        transaction_type: ["TOPUP", "PAYMENT", "REFUND", "WITHDRAW"],
      },
    });
    await queryInterface.addConstraint("transactions", {
      fields: ["transaction_status"],
      type: "check",
      name: "chk_transactions_status",
      where: {
        transaction_status: ["PENDING", "SUCCESS", "FAILED", "CANCELLED", "EXPIRED"],
      },
    });
    await queryInterface.addConstraint("transactions", {
      fields: ["payment_method"],
      type: "check",
      name: "chk_transactions_payment_method",
      where: {
        payment_method: ["BALANCE", "QRIS", "BANK_TRANSFER", "EWALLET"],
      },
    });
    await queryInterface.addConstraint("transactions", {
      fields: ["total_amount"],
      type: "check",
      name: "chk_transactions_total_amount",
      where: Sequelize.literal("total_amount >= 0"),
    });
    await queryInterface.addConstraint("transactions", {
      fields: ["balance_before"],
      type: "check",
      name: "chk_transactions_balance_before",
      where: Sequelize.literal("balance_before >= 0"),
    });
    await queryInterface.addConstraint("transactions", {
      fields: ["balance_after"],
      type: "check",
      name: "chk_transactions_balance_after",
      where: Sequelize.literal("balance_after >= 0"),
    });

    await queryInterface.addIndex("transactions", ["user_id"]);
    await queryInterface.addIndex("transactions", ["service_id"]);
    await queryInterface.addIndex("transactions", ["invoice_number"]);
    await queryInterface.addIndex("transactions", ["transaction_type"]);
    await queryInterface.addIndex("transactions", ["transaction_status"]);
    await queryInterface.addIndex("transactions", ["created_at"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("transactions");
  },
};
