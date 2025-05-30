import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateHardwareDto {
  @IsNotEmpty()
  @IsString()
  Codigo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  Estado?: string; // Opcional porque tiene valor por defecto en la BD

  @IsNotEmpty()
  @IsNumber()
  Precio: number;

  @IsNotEmpty()
  @IsNumber()
  idpabellon: number;

  @IsNotEmpty()
  @IsNumber()
  idpiso: number;

  @IsNotEmpty()
  @IsNumber()
  idsalon: number;

  @IsNotEmpty()
  @IsNumber()
  idarticulostipo: number;

  @IsNotEmpty()
  @IsString()
  imagen: string;
}
