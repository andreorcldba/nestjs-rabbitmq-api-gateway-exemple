import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';
import { HelperService } from '../helper/helper.service';

const helperService = new HelperService(new ConfigService());

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, ConfigService, helperService.rabbitMqConfig(MicroservicesList.userMicroService)]
})
export class CitiesModule {}
