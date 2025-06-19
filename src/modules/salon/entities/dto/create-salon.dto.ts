import { IsString, IsNumber } from 'class-validator';

export class CreateSalonDto {
  @IsString()
  nombre: string;

  @IsNumber()
  idpiso: number;

  @IsNumber()
  idpabellon: number;
}
