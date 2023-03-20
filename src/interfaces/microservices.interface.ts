//     removeCity: helperService.prepareEvent('removeCity', MicroservicesList.userMicroService)

export interface IEventList {
  userMicroservice: {
    logIn: IEventSend;
    update: IEventSend;
    findOne: IEventSend;
    findOneByEmail: IEventSend;
    findAll: IEventSend;
    create: IEventSend;
    remove: IEventSend;
    findAllFederalUnits: IEventSend;
    findOneFederalUnit: IEventSend;
    createFederalUnit: IEventSend;
    removeFederalUnit: IEventSend;
    updateFederalUnit: IEventSend;
    createCity: IEventSend;
    findOneCity: IEventSend;
    findAllCities: IEventSend;
    updateCity: IEventSend;
    removeCity: IEventSend;
  };
}

export interface IEventSend {
  eventName: string;
  token: string;
}
export interface IUpdateMicroserviceResponse {
  generatedMaps: [];
  raw: [];
  affected: number;
}
