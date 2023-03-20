import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';
import { IEventList } from 'src/interfaces/microservices.interface';
import { HelperService } from 'src/modules/helper/helper.service';

const helperService = new HelperService(new ConfigService());

// map microservices events payload
export const eventList: IEventList = {
  userMicroservice: {
    //Users
    logIn: helperService.prepareEvent('logIn', MicroservicesList.userMicroService),
    create: helperService.prepareEvent('create', MicroservicesList.userMicroService),
    findAll: helperService.prepareEvent('findAll', MicroservicesList.userMicroService),
    findOne: helperService.prepareEvent('findOne', MicroservicesList.userMicroService),
    findOneByEmail: helperService.prepareEvent('findOneByEmail', MicroservicesList.userMicroService),
    update: helperService.prepareEvent('update', MicroservicesList.userMicroService),
    remove: helperService.prepareEvent('remove', MicroservicesList.userMicroService),
    //federal-units
    createFederalUnit: helperService.prepareEvent('createFederalUnit', MicroservicesList.userMicroService),
    findAllFederalUnits: helperService.prepareEvent('findAllFederalUnits', MicroservicesList.userMicroService),
    findOneFederalUnit: helperService.prepareEvent('findOneFederalUnit', MicroservicesList.userMicroService),
    updateFederalUnit: helperService.prepareEvent('updateFederalUnit', MicroservicesList.userMicroService),
    removeFederalUnit: helperService.prepareEvent('removeFederalUnit', MicroservicesList.userMicroService),
    //cities
    createCity: helperService.prepareEvent('createCity', MicroservicesList.userMicroService),
    findAllCities: helperService.prepareEvent('findAllCities', MicroservicesList.userMicroService),
    findOneCity: helperService.prepareEvent('findOneCity', MicroservicesList.userMicroService),
    updateCity: helperService.prepareEvent('updateCity', MicroservicesList.userMicroService),
    removeCity: helperService.prepareEvent('removeCity', MicroservicesList.userMicroService)
  }
};
