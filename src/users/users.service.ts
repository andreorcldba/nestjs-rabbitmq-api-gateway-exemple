import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('userMicroService')
    private readonly userMicroService: ClientProxy
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send('createUser', createUserDto));
  }

  async findAll(): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send('findAllUsers', null));
  }

  async findOne(id: number): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send('findOneUsers', { id }));
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send('updateUser', { ...updateUserDto, id }));
  }

  async remove(id: number): Promise<Observable<any>> {
    return await firstValueFrom(this.userMicroService.send('deleteUsers', { id }));
  }
}
