import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateReporteDto {
  @IsOptional()
  @IsString()
  facultad?: string;

  @IsOptional()
  @IsString()
  turno?: string;

  @IsOptional()
  @IsString()
  Pabellon?: string;

  @IsOptional()
  @IsString()
  evidencia?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDateString()
  fecha: string;

  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  Piso?: string;

  @IsOptional()
  @IsString()
  Salon?: string;

  @IsOptional()
  @IsString()
  Articulos?: string;

  @IsOptional()
  @IsString()
  Motivo?: string;
}
