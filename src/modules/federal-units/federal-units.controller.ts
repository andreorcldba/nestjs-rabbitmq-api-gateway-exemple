import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFederalUnitDto } from './dto/create-federal-unit.dto';
import { UpdateFederalUnitDto } from './dto/update-federal-unit.dto';
import { FederalUnit } from './entities/federal-unit.entity';
import { FederalUnitsService } from './federal-units.service';

@Controller('federal-units')
export class FederalUnitsController {
  constructor(private readonly federalUnitsService: FederalUnitsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createFederalUnitDto: CreateFederalUnitDto): Promise<FederalUnit> {
    return this.federalUnitsService.create(createFederalUnitDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<FederalUnit[]> {
    return this.federalUnitsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<FederalUnit> {
    return this.federalUnitsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFederalUnitDto: UpdateFederalUnitDto): Promise<void> {
    return this.federalUnitsService.update(+id, updateFederalUnitDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.federalUnitsService.remove(+id);
  }
}
