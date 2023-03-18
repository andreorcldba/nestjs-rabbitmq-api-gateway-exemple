import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { eventList } from 'src/constants';
import { RequestWithUser } from 'src/global-interfaces/request-user.interface';
import { HelperService } from '../helper/helper.service';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthenticationsService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject('userMicroService')
    private readonly userMicroService: ClientProxy
  ) {}

  async validateUser(email: string, password: string) {
    return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.logIn, { email, password }));
  }

  getJwtToken(user: RequestWithUser['user']) {
    const payload = { email: user.email };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token
    };
  }

  async getJwtRefreshToken({ email, id }, old_token: string) {
    const user = await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findOne, id));

    if (!user.id) throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);

    const refreshToken = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME_REFRESH_TOKEN')
      }
    );

    return { refreshToken };
  }

  async getUserIfRefreshTokenMatches(email: TokenDto['email']) {
    const user = await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findOneByEmail, email));
    if (!user.id) throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);

    return user;
  }

  async getTokenAndRefreshToken(user: RequestWithUser['user']) {
    const { access_token } = this.getJwtToken(user);

    const { refreshToken } = await this.getJwtRefreshToken({ email: user.email, id: user.id }, access_token);

    user.password = undefined;

    return {
      user,
      access_token,
      refreshToken
    };
  }
}
