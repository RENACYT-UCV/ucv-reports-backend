import { IsInt, IsDateString } from 'class-validator';

export class CreateHistorialProductosIngresadosDto {
  @IsInt()
  idpersonal: number;

  @IsInt()
  idalmacen: number;

  @IsDateString()
  fecha: string;

  @IsInt()
  cantidad_productos_aumentados: number;
}