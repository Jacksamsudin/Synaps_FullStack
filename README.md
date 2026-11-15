
# Synaps - Backend

Backend aplikasi Synaps menggunakan NestJS untuk mengelola tugas perkuliahan mahasiswa.

## Deskripsi

Synaps merupakan aplikasi pengelolaan tugas kuliah yang membantu mahasiswa mencatat tugas, mata kuliah, deadline, prioritas, dan status pengerjaan.

Backend menyediakan REST API untuk operasi CRUD (Create, Read, Update, Delete).

## Teknologi

- NestJS
- TypeScript
- Node.js
- class-validator
- class-transformer
- REST API

## Struktur MVC

- Entity: representasi data Task.
- DTO: validasi data masuk.
- Service: logika CRUD menggunakan array sementara.
- Controller: menangani HTTP request.
- Module: mengatur controller dan service.

## Data Task

- id
- judul
- deskripsi
- matakuliah
- deadline
- prioritas
- status

## Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /tasks | Mengambil semua tugas |
| GET | /tasks/:id | Mengambil tugas berdasarkan ID |
| POST | /tasks | Menambahkan tugas |
| PATCH | /tasks/:id | Memperbarui tugas |
| DELETE | /tasks/:id | Menghapus tugas |

## Validasi dan Error Handling

Validasi menggunakan class-validator dan Global ValidationPipe.

Skenario error:
- 400 Bad Request: data tidak valid.
- 404 Not Found: tugas tidak ditemukan.
- 409 Conflict: data tugas duplikat.

## Menjalankan Backend

```bash
npm install
npm run start:dev
```

Backend berjalan di:

http://localhost:3000

## Menjalankan Frontend

Frontend berada pada folder fe.

```bash
cd fe
npm install
npm run dev
```

Frontend berjalan di:

http://localhost:5173

## Dokumentasi Pengujian

Bukti pengujian REST API tersedia pada folder:

docs/screenshots/

Pengujian meliputi POST, GET ALL, GET ONE, PATCH, DELETE, dan dua skenario error.

## Catatan

Data tugas disimpan sementara menggunakan array di dalam service. Data akan hilang ketika server dimulai ulang.
