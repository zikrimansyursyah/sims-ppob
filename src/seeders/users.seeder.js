"use strict";

/** @type {import('sequelize-cli').Seeder} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          role: "ADMIN",
          email: "admin@nutech-integrasi.com",
          password: "$2b$10$rkAEalAh92TeP7/x8LQymO866css2cX43Z5uqBPIUB8NEh4MWjrpe", // admin123
          first_name: "Administrator",
          last_name: "Nutech Edit",
          profile_image_url: "https://minio.nutech-integrasi.com/take-home-test/profile/LLKR6JL1-1779300347439.png",
          is_active: true,
          created_at: new Date(),
        },
        {
          role: "MEMBER",
          email: "user@nutech-integrasi.com",
          password: "$2b$10$xY2hkwnWNeUOeZx1TmjM1uyh02ih8SO7MQH1e2zdARNZV9H6JlQzu", // abcdef1234
          first_name: "User",
          last_name: "Nutech Edit",
          profile_image_url: "https://minio.nutech-integrasi.com/take-home-test/profile/LLKR6JL1-1779300347439.png",
          is_active: true,
          created_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      "users",
      {
        name: ["Banner 1", "Banner 2", "Banner 3", "Banner 4", "Banner 5"],
      },
      {},
    );
  },
};
