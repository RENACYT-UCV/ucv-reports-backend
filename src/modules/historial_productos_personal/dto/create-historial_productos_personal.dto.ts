import { IsInt, IsDateString } from 'class-validator';

export class CreateHistorialProductosPersonalDto {
  @IsInt()
  idpersonal: number;

  @IsInt()
  idalmacen: number;

  @IsDateString()
  fecha: string;

  @IsInt()
  cantidadUsada: number;
}