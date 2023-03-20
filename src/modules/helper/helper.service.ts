import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroservicesList, MicroserviceTokenList } from 'src/enums/global.enum';
import { IEventSend } from 'src/interfaces/microservices.interface';

@Injectable()
export class HelperService {
  constructor(private configService: ConfigService) {}

  prepareEvent(eventName: string, microserviceName: string): IEventSend {
    return {
      eventName,
      token: this.configService.get(MicroserviceTokenList[microserviceName])
    };
  }

  rabbitMqConfig(queue: MicroservicesList) {
    return {
      provide: queue,
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');
        const port = configService.get('RABBITMQ_PORT');
        const queueName = configService.get('RABBITMQ_QUEUE_NAME');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}:${port}`],
            queue: queueName,
            queueOptions: {
              durable: true
            }
          }
        });
      },
      inject: [ConfigService]
    };
  }
}
