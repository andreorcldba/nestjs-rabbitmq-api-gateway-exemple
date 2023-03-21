import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';
import { OutputTransportsService } from 'src/output-transports/output-transports.transports';
import { HelperService } from '../helper/helper.service';

@Module({
  controllers: [UsersController],
  providers: [
    ConfigService,
    UsersService,
    HelperService,
    OutputTransportsService.rabbitMqClient(MicroservicesList.userMicroService)
  ]
})
export class UsersModule {}
