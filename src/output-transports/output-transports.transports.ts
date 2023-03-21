import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroservicesList, MicroserviceTokenList } from 'src/enums/global.enum';

export class OutputTransportsService {
  static rabbitMqClient(queue: MicroservicesList) {
    const configService = new ConfigService();

    return {
      provide: queue,
      useFactory: () => {
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
