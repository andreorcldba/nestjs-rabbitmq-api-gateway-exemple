import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { eventList } from 'src/constants/microservices';
import { IRequestUser } from 'src/interfaces/request-user.interface';
import { IAccessAndRefreshToken, IAccessToken, IRefreshToken } from 'src/interfaces/tokens.interface';
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

  async validateUser(email: string, password: string): Promise<Users> {
    try {
      return firstValueFrom(this.userMicroService.send<Users>(eventList.userMicroservice.logIn, { email, password }));
    } catch (error) {
      throw new HttpException(responseHttpErrorMessage[HttpStatus.UNAUTHORIZED], HttpStatus.UNAUTHORIZED);
    }
  }

  async getJwtToken(user: IRequestUser['user']): Promise<IAccessToken> {
    const payload = { email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      accessToken: access_token
    };
  }

  async getJwtRefreshToken({ email, id }): Promise<IRefreshToken> {
    const refreshToken = await this.jwtService.signAsync(
      { email, id },
      {
        secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME_REFRESH_TOKEN')
      }
    );

    return { refreshToken };
  }

  async getUserIfRefreshTokenMatches(email: TokenDto['email']): Promise<Users> {
    try {
      return firstValueFrom(this.userMicroService.send<Users>(eventList.userMicroservice.findOneByEmail, email));
    } catch (error) {
      throw new HttpException(responseHttpErrorMessage[HttpStatus.NOT_FOUND], HttpStatus.NOT_FOUND);
    }
  }

  async getTokenAndRefreshToken(user: IRequestUser['user']): Promise<IAccessAndRefreshToken> {
    const { accessToken } = await this.getJwtToken(user);
    const { refreshToken } = await this.getJwtRefreshToken({ email: user.email, id: user.id });
    user.password = undefined;

    return {
      user,
      accessToken,
      refreshToken
    };
  }
}
