import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { RequestWithUser } from 'src/global-interfaces/request-user.interface';
import { Users } from '../users/entities/users.entity';
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
    return await firstValueFrom(this.userMicroService.send('log-in', { email, password }));
  }

  getJwtToken(user: RequestWithUser['user']) {
    const payload = { email: user.email };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token
    };
  }

  async setJwtToken(id: number, access_token: string) {
    const rememberTokenUpdated = await firstValueFrom(
      this.userMicroService.send('update', {
        remember_token: access_token,
        id
      })
    );

    if (rememberTokenUpdated.affected === 0) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getJwtRefreshToken({ email, id }, old_token: string) {
    const user = await firstValueFrom(this.userMicroService.send('findOne', id));

    if (!user.id) throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    if (user.remember_token !== old_token) throw new HttpException('Incorrect token', HttpStatus.UNAUTHORIZED);

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
    const user = await firstValueFrom(this.userMicroService.send('findOneByEmail', email));
    if (!user.id) throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);

    return user;
  }

  async getTokenAndRefreshToken(user: RequestWithUser['user']) {
    const { access_token } = this.getJwtToken(user);

    await this.setJwtToken(user.id, access_token);
    const { refreshToken } = await this.getJwtRefreshToken({ email: user.email, id: user.id }, access_token);

    user.password = undefined;
    user.remember_token = undefined;

    return {
      user,
      access_token,
      refreshToken
    };
  }
}
