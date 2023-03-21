import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MicroservicesList } from 'src/enums/global.enum';
import { eventList } from 'src/constants/microservices';
import { Users } from './entities/users.entity';
import { HelperService } from '../helper/helper.service';
@Injectable()
export class UsersService {
  constructor(
    private readonly helperService: HelperService,
    @Inject(MicroservicesList.userMicroService)
    private readonly userMicroService: ClientProxy
  ) {}

  create(createUserDto: CreateUserDto): Promise<Users> {
    const eventProps = eventList.userMicroservice.createUser;

    return this.helperService.sendEvent(eventProps, createUserDto, this.userMicroService);
  }

  findAll(): Promise<Users[]> {
    const eventProps = eventList.userMicroservice.findAllUsers;

    return this.helperService.sendEvent(eventProps, {}, this.userMicroService);
  }

  findOne(id: number): Promise<Users> {
    const eventProps = eventList.userMicroservice.findOneUser;

    return this.helperService.sendEvent(eventProps, id, this.userMicroService);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const eventProps = eventList.userMicroservice.updateUser;

    return this.helperService.sendEvent(eventProps, { ...updateUserDto, id }, this.userMicroService);
  }

  async remove(id: number): Promise<void> {
    const eventProps = eventList.userMicroservice.removeUser;

    return this.helperService.sendEvent(eventProps, id, this.userMicroService);
  }
}
