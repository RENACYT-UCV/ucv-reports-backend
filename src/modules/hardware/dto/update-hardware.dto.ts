import { IsString } from 'class-validator';

export class UpdateHardwareEstadoDto {
  @IsString()
  Estado: string;
}

import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateHardwareLocationDto {
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
