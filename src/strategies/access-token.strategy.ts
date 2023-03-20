import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthenticationsService } from '../modules/authentications/authentications.service';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/modules/users/entities/users.entity';
import { responseHttpErrorMessage } from 'src/constants/http-responses';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthenticationsService, public configService: ConfigService) {
    super({ usernameField: 'email', secretOrKey: configService.get('JWT_SECRET_REFRESH_TOKEN') });
  }

  async validate(email: string, password: string): Promise<Users> {
    const user = await this._authService.validateUser(email, password);

    if (user?.id) {
      return user;
    }

    throw new HttpException(responseHttpErrorMessage[HttpStatus.UNAUTHORIZED], HttpStatus.UNAUTHORIZED);
  }
}
