import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom, Observable } from 'rxjs';
import { MicroservicesList } from 'src/enums/global.enum';
import { eventList } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MicroservicesList.userMicroService)
    private readonly userMicroService: ClientProxy
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.create, createUserDto));
  }

  async findAll(): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findAll, {}));
  }

  async findOne(id: number): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findOne, id));
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Observable<any>> {
    return await firstValueFrom(
      this.userMicroService.send(eventList.userMicroservice.update, { ...updateUserDto, id })
    );
  }

  remove(id: number): void {
    firstValueFrom(this.userMicroService.send(eventList.userMicroservice.remove, id));
  }
}
