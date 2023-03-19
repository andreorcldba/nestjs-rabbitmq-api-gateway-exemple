import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { eventList } from 'src/constants';
import { MicroservicesList } from 'src/enums/global.enum';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(MicroservicesList.userMicroService)
    private readonly userMicroService: ClientProxy
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.createProfile, createProfileDto));
  }

  async findAll(): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findAllProfile, {}));
  }

  async findOne(id: number): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send(eventList.userMicroservice.findOneProfile, id));
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<Observable<any>> {
    return await firstValueFrom(
      this.userMicroService.send(eventList.userMicroservice.updateProfile, { ...updateProfileDto, id })
    );
  }

  remove(id: number): void {
    firstValueFrom(this.userMicroService.send(eventList.userMicroservice.removeProfile, id));
  }
}
