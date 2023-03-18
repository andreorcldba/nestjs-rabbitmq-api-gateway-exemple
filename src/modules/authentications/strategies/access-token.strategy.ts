import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationsService } from '../authentications.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationsService) {
    super({ usernameField: 'email', secretOrKey: '123' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (user?.id) {
      return user;
    }
  }
}
