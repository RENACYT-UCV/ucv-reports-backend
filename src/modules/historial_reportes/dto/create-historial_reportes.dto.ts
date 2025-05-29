import { IsInt, IsDateString } from 'class-validator';

export class CreateHistorialReportesDto {
  @IsInt()
  usuario_id: number;

  @IsInt()
  reporte_id: number;

  @IsDateString()
  fecha: string;
}