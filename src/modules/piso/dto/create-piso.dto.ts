import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePisoDto {
  @IsNumber()
  @IsNotEmpty()
  numero_piso: number;

  @IsNumber()
  @IsNotEmpty()
  idpabellon: number;
}
