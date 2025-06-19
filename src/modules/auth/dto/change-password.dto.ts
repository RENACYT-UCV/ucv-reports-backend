import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ChangePasswordDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
