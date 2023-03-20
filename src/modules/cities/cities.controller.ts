import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IUpdateMicroserviceResponse } from 'src/interfaces/microservices.interface';
import { Users } from '../users/entities/users.entity';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    return await this.citiesService.create(createCityDto);
  }

  @Get()
  async findAll() {
    return await this.citiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Users> {
    return await this.citiesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto): Promise<IUpdateMicroserviceResponse> {
    return await this.citiesService.update(+id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.citiesService.remove(+id);
  }
}
