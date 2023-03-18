import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceTokenList } from 'src/enums/global.enum';

@Injectable()
export class HelperService {
  constructor(private configService: ConfigService) {}

  prepareEvent(
    eventName: string,
    microserviceName: string
  ): {
    eventName: string;
    token: string;
  } {
    return {
      eventName,
      token: this.configService.get(MicroserviceTokenList[microserviceName])
    };
  }
}
