"use strict";

/** @type {import('sequelize-cli').Seeder} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "banners",
      [
        {
          name: "Banner 1",
          image_url: "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-1.png",
          description: "Lerem Ipsum Dolor sit amet",
          is_active: true,
          created_at: new Date(),
        },
        {
          name: "Banner 2",
          image_url: "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-2.png",
          description: "Lerem Ipsum Dolor sit amet",
          is_active: true,
          created_at: new Date(),
        },
        {
          name: "Banner 3",
          image_url: "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-3.png",
          description: "Lerem Ipsum Dolor sit amet",
          is_active: true,
          created_at: new Date(),
        },
        {
          name: "Banner 4",
          image_url: "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-4.png",
          description: "Lerem Ipsum Dolor sit amet",
          is_active: true,
          created_at: new Date(),
        },
        {
          name: "Banner 5",
          image_url: "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-5.png",
          description: "Lerem Ipsum Dolor sit amet",
          is_active: true,
          created_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      "banners",
      {
        name: ["Banner 1", "Banner 2", "Banner 3", "Banner 4", "Banner 5"],
      },
      {},
    );
  },
};
