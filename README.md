# SIMS PPOB

Backend API PPOB untuk member, banner, layanan, saldo, top-up, dan transaksi.

## Ringkas

- `Node.js`, `Express`, `Sequelize`
- PostgreSQL sebagai database
- JWT untuk autentikasi member
- Multer untuk upload foto profil
- Validasi input dengan Joi

## Struktur Utama

- `src/server.js` - server bootstrap
- `src/app.js` - konfigurasi Express dan middleware
- `src/routes/` - daftar route
- `src/controllers/` - logika request handler
- `src/services/` - logika bisnis
- `src/repositories/` - query database
- `src/models/` - definisi model Sequelize
- `src/migrations/` - migrasi database
- `src/validations/` - skema request validation

## Installasi

```bash
git clone <repo-url>
cd sims-ppob
npm install
```

Buat file `.env` dengan konfigurasi database dan `JWT_SECRET_KEY`.

## Database

```bash
npm run db:create
npm run db:migrate
```

Untuk migrasi atau seed baru:

```bash
npm run db:g:migration -- <nama_migrasi>
npm run db:g:seed -- <nama_seeder>
npm run db:seeds
```

## Jalankan Server

```bash
npm run dev
```

## Endpoint Utama

### Autentikasi

- `POST /registration`
- `POST /login`

### Profile (dengan auth)

- `GET /profile`
- `PUT /profile/update`
- `PUT /profile/image`

### Banner (dengan auth)

- `GET /banner`

### Services (dengan auth)

- `GET /services`

### Transaksi (dengan auth)

- `GET /balance`
- `POST /topup`
- `POST /transaction`
- `GET /transaction/history`

## Catatan

- Upload foto profil disimpan di `public/profile-images`
- Semua endpoint protected memerlukan JWT dan role `member`

## Lisensi

ISC
