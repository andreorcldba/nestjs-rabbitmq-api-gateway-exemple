import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AuthenticationsService {
  constructor(
    @Inject('userMicroService')
    private readonly userMicroService: ClientProxy
  ) {}

  async validateUser(email: string, password: string){
    return await firstValueFrom(this.userMicroService.send('log-in', { email, password }));
  }
}
