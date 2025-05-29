import { IsString } from 'class-validator';

export class CreateCargoDto {
  @IsString()
  descripcion: string;
}