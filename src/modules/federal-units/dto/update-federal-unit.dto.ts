import { PartialType } from '@nestjs/mapped-types';
import { CreateFederalUnitDto } from './create-federal-unit.dto';

export class UpdateFederalUnitDto extends PartialType(CreateFederalUnitDto) {}
