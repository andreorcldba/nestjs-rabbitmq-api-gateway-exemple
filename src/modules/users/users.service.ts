import { ClientProxy } from '@nestjs/microservices';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom, Observable } from 'rxjs';
import { MicroservicesList } from 'src/enums/global.enum';
import { eventList } from 'src/constants/microservices';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { Users } from './entities/users.entity';
@Injectable()
export class UsersService {
  constructor(
    @Inject(MicroservicesList.userMicroService)
    private readonly userMicroService: ClientProxy
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.create, createUserDto));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findAll, {}));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<Users> {
    try {
      return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findOne, id));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    try {
      await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.update, { ...updateUserDto, id }));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.remove, id));
    } catch (error) {
      throw new HttpException(
        responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
