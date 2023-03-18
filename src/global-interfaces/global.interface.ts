import { HelperService } from 'src/modules/helper/helper.service';
import { ConfigService } from '@nestjs/config';
import { MicroservicesList } from 'src/enums/global.enum';


export interface EventPropertyInterface {
  eventName: string;
  token: string;
}

export interface MicroservicesEventListInterface {
  userMicroservice: {
    logIn?: EventPropertyInterface;
    create?: EventPropertyInterface;
    findAll?: EventPropertyInterface;
    findOne?: EventPropertyInterface;
    findOneByEmail?: EventPropertyInterface;
    update?: EventPropertyInterface;
    remove?: EventPropertyInterface;
  };
}



