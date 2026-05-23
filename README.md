# SIMS PPOB

API service untuk manajemen member, transaksi, banner, dan layanan PPOB.

## Teknologi

- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Joi untuk validasi input
- JWT untuk autentikasi
- Bcrypt untuk hashing password
- Pino untuk logging
- Helmet, CORS, dan rate limiting untuk keamanan

## Struktur Proyek

- `src/server.js` - entry point server
- `src/app.js` - konfigurasi Express dan rute
- `src/models/` - definisi Sequelize models
- `src/migrations/` - migrasi database
- `src/seeders/` - data awal untuk database
- `src/routes/` - endpoint routes
- `src/controllers/` - controller logic
- `src/services/` - service/business logic
- `src/repositories/` - query/database access layer
- `src/config/` - konfigurasi database dan logger
- `src/middlewares/` - middleware request handling
- `src/validations/` - skema validasi input

## Instalasi

1. Clone repositori:
   ```bash
   git clone <repo-url>
   cd sims-ppob
   ```
2. Install dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` di root dan isi variabel lingkungan.

## Variabel Lingkungan

Isi file `.env` dengan variabel berikut:

```env
PORT=3000

# Local database
DB_HOST_LOCAL=localhost
DB_NAME_LOCAL=sims_ppob_local
DB_USERNAME_LOCAL=postgres
DB_PASSWORD_LOCAL=secret
DB_DIALECT_LOCAL=postgres

# Development database
DB_HOST_DEVELOPMENT=localhost
DB_NAME_DEVELOPMENT=sims_ppob_dev
DB_USERNAME_DEVELOPMENT=postgres
DB_PASSWORD_DEVELOPMENT=secret
DB_DIALECT_DEVELOPMENT=postgres

# Production database
DB_HOST_PRODUCTION=localhost
DB_NAME_PRODUCTION=sims_ppob_prod
DB_USERNAME_PRODUCTION=postgres
DB_PASSWORD_PRODUCTION=secret
DB_DIALECT_PRODUCTION=postgres

# Autentikasi
JWT_SECRET_KEY=your_jwt_secret
HASH_SALT=10
```

> `NODE_ENV` digunakan untuk memilih konfigurasi database. Default adalah `development`.

## Database

Jalankan perintah berikut untuk membuat dan memigrasi database:

```bash
npm run db:create
npm run db:migrate
```

Jika Anda ingin menambahkan migrasi atau seed baru:

```bash
npm run db:g:migration -- <nama_migrasi>
npm run db:g:seed -- <nama_seeder>
npm run db:seeds
```

## Menjalankan Server

- Development mode:
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

Server akan berjalan di `http://localhost:3000` kecuali jika `PORT` diubah.

## Endpoint API

### Auth

- `POST /registration` - registrasi member baru
- `POST /login` - login member

### Profile

- `GET /profile/` - ambil data profil
- `PUT /profile/update` - update profil
- `PUT /profile/image` - upload/ubah foto profil

### Banner

- `GET /banner` - daftar banner

### Services

- `GET /services` - daftar layanan

### Transaksi

- `GET /balance` - cek saldo
- `POST /topup` - top up saldo
- `POST /transaction` - buat transaksi
- `GET /transaction/history` - riwayat transaksi

> Saat ini beberapa route utama masih menggunakan response placeholder `{ status: 0 }`.

## Tips

- Pastikan koneksi database telah benar sebelum menjalankan `npm run dev`.
- Gunakan `NODE_ENV=local` atau `NODE_ENV=development` sesuai lingkungan.
- Periksa file `src/config/database.js` untuk penyesuaian konfigurasi Sequelize.

## Lisensi

ISC
