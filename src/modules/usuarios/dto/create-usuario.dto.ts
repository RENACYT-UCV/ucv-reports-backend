import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Matches,
  Equals,
  ValidateIf,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido_paterno: string;

  @IsString()
  @IsNotEmpty()
  apellido_materno: string;

  // The 'usuario' field will be generated in the service, not provided by the user
  // @IsString()
  // @IsNotEmpty()
  // usuario: string;

  @IsString()
  @IsNotEmpty()
  contraseña: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.contraseña)
  @Equals('contraseña', { message: 'Las contraseñas no coinciden' })
  verificar_contraseña: string;

  @IsNumber()
  @IsNotEmpty()
  id_cargo: number;

  // The 'Estado' field will be set in the service, not provided by the user
  // @IsString()
  // @IsNotEmpty()
  // Estado: string;
}
