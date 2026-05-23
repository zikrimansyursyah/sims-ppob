const defaultPort = process.env.PORT || 3000;

const serverUrl = process.env.BASE_URL || `http://localhost:${defaultPort}`;

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "SIMS PPOB API",
    version: "1.0.0",
    description: "Dokumentasi API untuk layanan PPOB member, informasi, dan transaksi.",
  },
  servers: [
    {
      url: serverUrl,
      description: "Primary server",
    },
  ],
  tags: [
    { name: "1. Module Membership", description: "Auth dan profil member" },
    { name: "1. Module Information", description: "Banner dan layanan PPOB" },
    { name: "1. Module Transaction", description: "Saldo, top-up, dan transaksi" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegistrationRequest: {
        type: "object",
        required: ["email", "first_name", "last_name", "password"],
        properties: {
          email: { type: "string", format: "email", example: "user4@nutech-integrasi.com" },
          first_name: { type: "string", example: "User" },
          last_name: { type: "string", example: "Nutech" },
          password: { type: "string", format: "password", example: "abcdef1234" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "user@nutech-integrasi.com" },
          password: { type: "string", format: "password", example: "abcdef1234" },
        },
      },
      ProfileUpdateRequest: {
        type: "object",
        properties: {
          first_name: { type: "string", example: "User Edited" },
          last_name: { type: "string", example: "Nutech Edited2s" },
        },
      },
      FileUploadRequest: {
        type: "object",
        properties: {
          file: { type: "string", format: "binary" },
        },
      },
      TopUpRequest: {
        type: "object",
        required: ["top_up_amount"],
        properties: {
          top_up_amount: { type: "number", example: 40000 },
        },
      },
      TransactionRequest: {
        type: "object",
        required: ["service_code"],
        properties: {
          service_code: { type: "string", example: "PULSA" },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          status: { type: "number", example: 102 },
          message: { type: "string", example: "Token tidak tidak valid atau kadaluwarsa" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/registration": {
      post: {
        tags: ["1. Module Membership"],
        summary: "Registrasi member baru",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegistrationRequest" },
            },
          },
        },
        responses: {
          201: { description: "Member berhasil didaftarkan" },
          400: {
            description: "Request tidak valid",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
    },
    "/login": {
      post: {
        tags: ["1. Module Membership"],
        summary: "Login member",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: { description: "Login berhasil" },
          401: {
            description: "Autentikasi gagal",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
    },
    "/profile": {
      get: {
        tags: ["1. Module Membership"],
        summary: "Ambil profil member saat ini",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Profil berhasil diambil" },
          401: { description: "Token tidak valid" },
        },
      },
    },
    "/profile/update": {
      put: {
        tags: ["1. Module Membership"],
        summary: "Update data profil member",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProfileUpdateRequest" },
            },
          },
        },
        responses: {
          200: { description: "Profil berhasil diupdate" },
          400: { description: "Request tidak valid" },
        },
      },
    },
    "/profile/image": {
      put: {
        tags: ["1. Module Membership"],
        summary: "Upload atau ubah foto profil",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/FileUploadRequest" },
            },
          },
        },
        responses: {
          200: { description: "Foto profil berhasil diupload" },
          400: { description: "Upload gagal" },
        },
      },
    },
    "/banner": {
      get: {
        tags: ["1. Module Information"],
        summary: "Ambil daftar banner aktif",
        security: [],
        responses: {
          200: { description: "Banner berhasil diambil" },
        },
      },
    },
    "/services": {
      get: {
        tags: ["1. Module Information"],
        summary: "Ambil daftar layanan PPOB",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Daftar layanan berhasil diambil" },
        },
      },
    },
    "/balance": {
      get: {
        tags: ["1. Module Transaction"],
        summary: "Cek saldo member",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Saldo berhasil diambil" },
        },
      },
    },
    "/topup": {
      post: {
        tags: ["1. Module Transaction"],
        summary: "Top up saldo member",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TopUpRequest" },
            },
          },
        },
        responses: {
          200: { description: "Top-up berhasil" },
          400: { description: "Top-up gagal" },
        },
      },
    },
    "/transaction": {
      post: {
        tags: ["1. Module Transaction"],
        summary: "Buat transaksi PPOB",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TransactionRequest" },
            },
          },
        },
        responses: {
          200: { description: "Transaksi berhasil" },
          400: { description: "Transaksi gagal" },
        },
      },
    },
    "/transaction/history": {
      get: {
        tags: ["1. Module Transaction"],
        summary: "Ambil riwayat transaksi member",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "offset",
            in: "query",
            schema: { type: "integer", default: 0 },
            description: "Nomor baris awal untuk pagination",
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 3 },
            description: "Jumlah item per halaman",
          },
        ],
        responses: {
          200: { description: "Riwayat transaksi berhasil diambil" },
          400: { description: "Request query tidak valid" },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
