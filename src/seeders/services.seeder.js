"use strict";

/** @type {import('sequelize-cli').Seeder} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "services",
      [
        {
          code: "PAJAK",
          name: "Pajak PBB",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/PBB.png",
          tariff: 40000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "PLN",
          name: "Listrik",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/Listrik.png",
          tariff: 10000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "PDAM",
          name: "PDAM Berlangganan",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/PDAM.png",
          tariff: 40000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "PULSA",
          name: "Pulsa",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/Pulsa.png",
          tariff: 40000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "PGN",
          name: "PGN Berlangganan",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/PGN.png",
          tariff: 50000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "MUSIK",
          name: "Musik Berlangganan",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/Musik.png",
          tariff: 50000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "TV",
          name: "TV Berlangganan",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/Televisi.png",
          tariff: 50000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "PAKET_DATA",
          name: "Paket Data",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/Paket-Data.png",
          tariff: 50000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "VOUCHER_GAME",
          name: "Voucher Game",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/Game.png",
          tariff: 100000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "VOUCHER_MAKANAN",
          name: "Voucher Makanan",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/Voucher-Makanan.png",
          tariff: 100000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "QURBAN",
          name: "Qurban",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/Qurban.png",
          tariff: 200000,
          is_active: true,
          created_at: new Date(),
        },
        {
          code: "ZAKAT",
          name: "Zakat",
          icon_url: "https://minio.nutech-integrasi.com/take-home-test/services/Zakat.png",
          tariff: 300000,
          is_active: true,
          created_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      "services",
      {
        code: ["PAJAK", "PLN", "PDAM", "PULSA", "PGN", "MUSIK", "TV", "PAKET_DATA", "VOUCHER_GAME", "VOUCHER_MAKANAN", "QURBAN", "ZAKAT"],
      },
      {},
    );
  },
};
