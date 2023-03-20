import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateFederalUnitDto } from './dto/create-federal-unit.dto';
import { UpdateFederalUnitDto } from './dto/update-federal-unit.dto';
import { FederalUnitsService } from './federal-units.service';

@Controller('federal-units')
export class FederalUnitsController {
  constructor(private readonly federalUnitsService: FederalUnitsService) {}

  @Post()
  async create(@Body() createFederalUnitDto: CreateFederalUnitDto) {
    return await this.federalUnitsService.create(createFederalUnitDto);
  }

  @Get()
  async findAll() {
    return await this.federalUnitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.federalUnitsService.findOne(+id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFederalUnitDto: UpdateFederalUnitDto) {
    return await this.federalUnitsService.update(+id, updateFederalUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.federalUnitsService.remove(+id);
  }
}
