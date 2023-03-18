import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthenticationsService } from '../authentications.service';
import { TokenDto } from '../dto/token.dto';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private authService: AuthenticationsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '123'
    });
  }

  async validate(request: TokenDto) {
    if (!request.email) return false;

    return this.authService.getUserIfRefreshTokenMatches(request.email);
  }
}
