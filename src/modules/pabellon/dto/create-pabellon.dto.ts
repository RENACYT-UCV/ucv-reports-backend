import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePabellonDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Pabellon: string;
}
