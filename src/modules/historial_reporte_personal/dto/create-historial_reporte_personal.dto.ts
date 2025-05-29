import { IsInt, IsDateString } from 'class-validator';

export class CreateHistorialReportePersonalDto {
  @IsInt()
  id_reporte: number;

  @IsInt()
  id_personal: number;

  @IsDateString()
  fecha: string;
}