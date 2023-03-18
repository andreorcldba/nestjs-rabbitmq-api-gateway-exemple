import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class TokenDto {
  email: string;
  refreshToken: string;
}
