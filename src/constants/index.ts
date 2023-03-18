import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';
import { HelperService } from 'src/modules/helper/helper.service';

const helperService = new HelperService(new ConfigService());

export const eventList = {
  userMicroservice: {
    logIn: helperService.prepareEvent('logIn', MicroservicesList.userMicroService),
    create: helperService.prepareEvent('create', MicroservicesList.userMicroService),
    findAll: helperService.prepareEvent('findAll', MicroservicesList.userMicroService),
    findOne: helperService.prepareEvent('findOne', MicroservicesList.userMicroService),
    findOneByEmail: helperService.prepareEvent('findOneByEmail', MicroservicesList.userMicroService),
    update: helperService.prepareEvent('update', MicroservicesList.userMicroService),
    remove: helperService.prepareEvent('remove', MicroservicesList.userMicroService)
  }
};
