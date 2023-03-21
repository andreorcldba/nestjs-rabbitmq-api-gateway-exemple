import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';
import { OutputTransportsService } from 'src/output-transports/output-transports.transports';
import { FederalUnitsController } from './federal-units.controller';
import { FederalUnitsService } from './federal-units.service';

@Module({
  controllers: [FederalUnitsController],
  providers: [FederalUnitsService, ConfigService, OutputTransportsService.rabbitMqClient(MicroservicesList.userMicroService)]
})
export class FederalUnitsModule {}
