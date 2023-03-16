import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationsService } from '../authentications.service';
import { Observable } from 'rxjs';
//import { AuthService } from '../auth.service';
//import { User } from '../../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationsService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const response = await this.authService.validateUser(email, password);

    if (response?.statusCode !== HttpStatus.OK) throw new HttpException(response, response.statusCode);

    return response;
  }
}
