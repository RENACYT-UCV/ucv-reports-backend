import { IsString, IsInt } from 'class-validator';

export class CreateArticuloDto {
  @IsString()
  nombre: string;

  @IsInt()
  puntaje: number;
}