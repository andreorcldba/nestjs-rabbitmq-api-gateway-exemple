import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { RequestWithUser } from 'src/global-interfaces/request-user.interface';
import { AuthenticationsService } from './authentications.service';
import { LoginAuthenticationGuard } from './guards/login-authentication.guard';

@Controller()
export class AuthenticationsController {
  constructor(private readonly authenticationsService: AuthenticationsService) {}

  @HttpCode(200)
  @UseGuards(LoginAuthenticationGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const { access_token } = this.authenticationsService.getJwtToken(user);

    await this.authenticationsService.setJwtToken(user.id, access_token);
    const { refreshToken } = await this.authenticationsService.getJwtRefreshToken(
      { email: user.email, id: user.id },
      access_token
    );

    user.password = undefined;
    user.remember_token = undefined;

    return {
      user,
      access_token,
      refreshToken
    };
  }
}
