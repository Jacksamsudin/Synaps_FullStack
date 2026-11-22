# Synaps – Backend

Synaps adalah aplikasi personal assistant untuk membantu pengguna mengelola tugas kuliah dan aktivitas harian. Backend dibangun menggunakan NestJS, REST API, PostgreSQL, dan Prisma ORM.

## Teknologi
- Node.js
- NestJS
- PostgreSQL
- Prisma ORM

## Menjalankan backend

1. Pastikan PostgreSQL aktif dan buat database bernama `synaps_db`.
2. Salin `.env.example` menjadi `.env`, lalu sesuaikan username dan password PostgreSQL.
3. Instal dependency dan generate Prisma Client:

   ```bash
   npm install
   npx prisma generate
   ```

4. Jalankan migrasi database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Jalankan backend:

   ```bash
   npm run start:dev
   ```

Backend berjalan pada `http://localhost:3000`.

## Endpoint Tasks

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/tasks` | Menambahkan tugas |
| GET | `/tasks` | Mengambil semua tugas |
| GET | `/tasks/:id` | Mengambil tugas berdasarkan ID |
| PATCH | `/tasks/:id` | Mengubah tugas |
| DELETE | `/tasks/:id` | Menghapus tugas |

Controller tetap menggunakan endpoint yang sama seperti implementasi Pekan 9. Penyimpanan array pada `TasksService` telah diganti dengan Prisma Client sehingga data disimpan secara permanen di PostgreSQL.

## Screenshot

Simpan bukti tahapan dan tampilan aplikasi pada folder `docs/screenshots/`. Lihat `docs/screenshots/README.md` untuk daftar screenshot yang perlu dilampirkan.
