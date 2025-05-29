import { IsString, IsOptional } from 'class-validator';

export class CreateArticulosActualUsoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  LinkCompra?: string;
}