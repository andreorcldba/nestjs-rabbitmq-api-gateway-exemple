import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { LoginAuthenticationGuard } from './guards/login-authentication.guard';

@Controller()
export class AuthenticationsController {
  constructor(private readonly authenticationsService: AuthenticationsService) {}

  @HttpCode(200)
  @UseGuards(LoginAuthenticationGuard)
  @Post('log-in')
  async login(
    //@Req() request: RequestWithUser,
    // @Res({passthrough:true}) res: Response 
    ) {
      return 'vai autenticar';
    // var {user} = request;
    // var token = this.authService.getCookieWithJwtToken(user.email)["access_token"];
    // this.authService.setCookieWithJwtToken(user.id, token);

    // user.password = undefined;
    // user.remember_token = undefined;
    // user = {...user, ...{token:token}};
      
    // res.cookie('Set-Cookie', token);
  
    // return user;
  }


}
