import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';
import { HelperService } from '../helper/helper.service';
import { FederalUnitsController } from './federal-units.controller';
import { FederalUnitsService } from './federal-units.service';

const helperService = new HelperService(new ConfigService());

@Module({
  controllers: [FederalUnitsController],
  providers: [FederalUnitsService, ConfigService, helperService.rabbitMqConfig(MicroservicesList.userMicroService)]
})
export class FederalUnitsModule {}
