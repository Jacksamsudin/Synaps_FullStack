
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  judul: string;

  @IsOptional()
  @IsString()
  deskripsi?: string;

  @IsString()
  @IsNotEmpty()
  matakuliah: string;

  @IsDateString()
  deadline: string;

  @IsIn(['rendah', 'sedang', 'tinggi'])
  prioritas: string;

  @IsIn(['belum-selesai', 'sedang-dikerjakan', 'selesai'])
  status: string;
}
