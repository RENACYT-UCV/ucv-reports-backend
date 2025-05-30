import { IsString } from 'class-validator';

export class UpdateHardwareEstadoDto {
  @IsString()
  Estado: string;
}
