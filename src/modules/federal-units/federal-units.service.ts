import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { eventList } from 'src/constants/microservices';
import { MicroservicesList } from 'src/enums/global.enum';
import { HelperService } from '../helper/helper.service';
import { CreateFederalUnitDto } from './dto/create-federal-unit.dto';
import { UpdateFederalUnitDto } from './dto/update-federal-unit.dto';
import { FederalUnit } from './entities/federal-unit.entity';

@Injectable()
export class FederalUnitsService {
  constructor(
    private readonly helperService: HelperService,
    @Inject(MicroservicesList.userMicroService)
    private readonly userMicroService: ClientProxy
  ) {}

  create(createFederalUnitDto: CreateFederalUnitDto): Promise<FederalUnit> {
    const eventProps = eventList.userMicroservice.createFederalUnit;

    return this.helperService.sendEvent(eventProps, createFederalUnitDto, this.userMicroService);
  }

  findAll(): Promise<FederalUnit[]> {
    const eventProps = eventList.userMicroservice.findAllFederalUnits;

    return this.helperService.sendEvent(eventProps, {}, this.userMicroService);
  }

  findOne(id: number): Promise<FederalUnit> {
    const eventProps = eventList.userMicroservice.findOneFederalUnit;

    return this.helperService.sendEvent(eventProps, id, this.userMicroService);
  }

  update(id: number, updateFederalUnitDto: UpdateFederalUnitDto): Promise<void> {
    const eventProps = eventList.userMicroservice.updateFederalUnit;

    return this.helperService.sendEvent(eventProps, { ...updateFederalUnitDto, id }, this.userMicroService);
  }

  async remove(id: number): Promise<void> {
    const eventProps = eventList.userMicroservice.removeFederalUnit;

    return this.helperService.sendEvent(eventProps, id, this.userMicroService);
  }
}
