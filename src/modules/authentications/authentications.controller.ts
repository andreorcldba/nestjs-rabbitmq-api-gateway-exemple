import { Controller, Get, Post, HttpCode, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IRequestUser } from 'src/interfaces/request-user.interface';
import { IAccessAndRefreshToken } from 'src/interfaces/tokens.interface';
import { AuthenticationsService } from './authentications.service';

@Controller()
export class AuthenticationsController {
  constructor(private readonly authenticationsService: AuthenticationsService) {}

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('log-in')
  async login(@Req() request: IRequestUser): Promise<IAccessAndRefreshToken> {
    return this.authenticationsService.getTokenAndRefreshToken(request.user);
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh-token'))
  async refreshToken(@Req() request: IRequestUser): Promise<IAccessAndRefreshToken> {
    return this.authenticationsService.getTokenAndRefreshToken(request.user);
  }
}
