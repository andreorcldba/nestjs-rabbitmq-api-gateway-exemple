import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';
import { OutputTransportsService } from 'src/output-transports/output-transports.transports';
import { HelperService } from '../helper/helper.service';
import { FederalUnitsController } from './federal-units.controller';
import { FederalUnitsService } from './federal-units.service';

@Module({
  controllers: [FederalUnitsController],
  providers: [
    FederalUnitsService,
    ConfigService,
    HelperService,
    OutputTransportsService.rabbitMqClient(MicroservicesList.userMicroService)
  ]
})
export class FederalUnitsModule {}
