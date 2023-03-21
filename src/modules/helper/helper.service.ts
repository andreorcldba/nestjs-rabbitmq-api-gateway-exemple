import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { MicroservicesList, MicroserviceTokenList } from 'src/enums/global.enum';
import { IEventList, IEventSend } from 'src/interfaces/microservices.interface';

@Injectable()
export class HelperService {
  constructor(private configService: ConfigService) {}

  prepareEvent(eventName: string, microserviceName: string): IEventSend {
    return {
      eventName,
      token: this.configService.get(MicroserviceTokenList[microserviceName])
    };
  }

  async sendEvent(eventProps: IEventSend, data: any, clientProxy: ClientProxy): Promise<any> {
    return await firstValueFrom(
      clientProxy.send(eventProps, data).pipe(
        timeout(2000) // <-- HTTP request will error out if no response for 5 seconds
      )
    ).catch((e) => {
      if (e?.statusCode) throw e;

      throw new HttpException(responseHttpErrorMessage[HttpStatus.REQUEST_TIMEOUT], HttpStatus.REQUEST_TIMEOUT);
    });
  }
}
