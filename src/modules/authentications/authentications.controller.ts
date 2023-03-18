import { Controller, Get, Post, HttpCode, UseGuards, Req } from '@nestjs/common';
import { RequestWithUser } from 'src/global-interfaces/request-user.interface';
import { AuthenticationsService } from './authentications.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';

@Controller()
export class AuthenticationsController {
  constructor(private readonly authenticationsService: AuthenticationsService) {}

  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser) {
    return this.authenticationsService.getTokenAndRefreshToken(request.user);
  }

  @Get('refresh-token')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Req() request: RequestWithUser) {
    return this.authenticationsService.getTokenAndRefreshToken(request.user);
  }
}
