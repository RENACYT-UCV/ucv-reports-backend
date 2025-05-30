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

export class CreateMultipleHardwareDto {
  @IsNotEmpty()
  @IsNumber()
  id_articulo: number;

  @IsNotEmpty()
  @IsString()
  codigo_inicial: string;

  @IsNotEmpty()
  @IsString()
  nombre_producto: string;

  @IsNotEmpty()
  @IsNumber()
  precio_producto: number;

  @IsNotEmpty()
  @IsString()
  imagen_producto: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad_registros: number;

  @IsNotEmpty()
  @IsString()
  estado_producto: string;

  @IsNotEmpty()
  @IsNumber()
  idpabellon: number;

  @IsNotEmpty()
  @IsNumber()
  idpiso: number;

  @IsNotEmpty()
  @IsNumber()
  idsalon: number;
}
