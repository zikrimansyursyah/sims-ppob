"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("services", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      icon_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tariff: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

    await queryInterface.addConstraint("services", {
      fields: ["tariff"],
      type: "check",
      name: "chk_services_tariff",
      where: Sequelize.literal("tariff >= 0"),
    });

    await queryInterface.addIndex("services", ["code"]);
    await queryInterface.addIndex("services", ["name"]);
    await queryInterface.addIndex("services", ["is_active"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("services");
  },
};
