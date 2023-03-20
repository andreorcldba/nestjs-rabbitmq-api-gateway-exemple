import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { eventList } from 'src/constants/microservices';
import { MicroservicesList } from 'src/enums/global.enum';
import { CreateFederalUnitDto } from './dto/create-federal-unit.dto';
import { UpdateFederalUnitDto } from './dto/update-federal-unit.dto';

@Injectable()
export class FederalUnitsService {
  constructor(
    @Inject(MicroservicesList.userMicroService)
    private readonly userMicroService: ClientProxy
  ) {}

  async create(createFederalUnitDto: CreateFederalUnitDto) {
    try {
      return await firstValueFrom(
        this.userMicroService.send(eventList.userMicroservice.createFederalUnit, createFederalUnitDto)
      );
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll() {
    try {
      return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findAllFederalUnits, {}));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number) {
    try {
      return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findOneFederalUnit, id));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateFederalUnitDto: UpdateFederalUnitDto) {
    try {
      return await firstValueFrom(
        this.userMicroService.send(eventList.userMicroservice.updateFederalUnit, { ...updateFederalUnitDto, id })
      );
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number) {
    try {
      return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.removeFederalUnit, id));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
