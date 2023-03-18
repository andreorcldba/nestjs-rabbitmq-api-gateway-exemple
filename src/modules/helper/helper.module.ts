import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HelperService } from './helper.service';

@Module({
  providers: [HelperService, ConfigService]
})
export class HelperModule {}
