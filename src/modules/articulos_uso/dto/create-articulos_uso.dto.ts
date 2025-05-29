import { IsString, IsInt } from 'class-validator';

export class CreateArticulosUsoDto {
  @IsString()
  nombre: string;

  @IsInt()
  Stock: number;
}