import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { eventList } from 'src/constants/microservices';
import { MicroservicesList } from 'src/enums/global.enum';
import { IUpdateMicroserviceResponse } from 'src/interfaces/microservices.interface';
import { Users } from '../users/entities/users.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(MicroservicesList.userMicroService)
    private readonly userMicroService: ClientProxy
  ) {}

  async create(createCityDto: CreateCityDto) {
    const message = eventList.userMicroservice.createCity;

    try {
      return await firstValueFrom(this.userMicroService.send(message, createCityDto));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findAllCities, {}));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<Users> {
    try {
      return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findOneCity, id));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<IUpdateMicroserviceResponse> {
    try {
      return await firstValueFrom(
        this.userMicroService.send(eventList.userMicroservice.updateCity, { ...updateCityDto, id })
      );
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<Users> {
    try {
      return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.removeCity, id));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
