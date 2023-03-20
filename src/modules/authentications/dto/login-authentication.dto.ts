import { IsNotEmpty, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginAuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  password: string;
}
