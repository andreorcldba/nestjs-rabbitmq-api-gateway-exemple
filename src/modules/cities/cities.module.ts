import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';
import { OutputTransportsService } from 'src/output-transports/output-transports.transports';


@Module({
  controllers: [CitiesController],
  providers: [CitiesService, ConfigService, OutputTransportsService.rabbitMqClient(MicroservicesList.userMicroService)]
})
export class CitiesModule {}
