import { ClientProxy } from '@nestjs/microservices';
import { HttpException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('userMicroService')
    private readonly userMicroService: ClientProxy
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await firstValueFrom(this.userMicroService.send('create', createUserDto));
  }

  async findAll(): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send('findAll', {}));
  }

  async findOne(id: number): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send('findOne', id));
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send('update', { ...updateUserDto, id }));
  }

  remove(id: number): void {
    firstValueFrom(this.userMicroService.send('remove', id));
  }
}
