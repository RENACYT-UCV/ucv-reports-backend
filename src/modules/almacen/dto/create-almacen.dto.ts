import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAlmacenDto {
  @IsString()
  nombre: string;

  @IsInt()
  stock: number;

  @IsOptional()
  @IsString()
  imagenproducto?: string;

  @IsOptional()
  @IsString()
  Compra?: string;
}
