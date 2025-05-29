import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAlmacenStockDanadoDto {
  @IsString()
  nombre: string;

  @IsInt()
  stocks: number;

  @IsOptional()
  @IsString()
  imagenproducto?: string;

  @IsOptional()
  @IsString()
  compra?: string;
}