import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthenticationsService } from '../modules/authentications/authentications.service';
import { TokenDto } from '../modules/authentications/dto/token.dto';
import { ConfigService } from '@nestjs/config';
import { IAccessAndRefreshToken } from '../interfaces/tokens.interface';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { Users } from 'src/modules/users/entities/users.entity';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private authService: AuthenticationsService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_REFRESH_TOKEN')
    });
  }

  async validate(request: TokenDto): Promise<Users> {
    if (!request.email)
      throw new HttpException(responseHttpErrorMessage[HttpStatus.UNAUTHORIZED], HttpStatus.UNAUTHORIZED);

    return this.authService.getUserIfRefreshTokenMatches(request.email);
  }
}
