import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';
import { HelperService } from '../helper/helper.service';

const helperService = new HelperService(new ConfigService());
@Module({
  controllers: [UsersController],
  providers: [ConfigService, UsersService, helperService.rabbitMqConfig(MicroservicesList.userMicroService)]
})
export class UsersModule {}
