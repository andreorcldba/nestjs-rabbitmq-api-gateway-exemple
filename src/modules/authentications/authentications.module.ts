import { Module } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsController } from './authentications.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../../strategies/access-token.strategy';
import { JwtRefreshTokenStrategy } from '../../strategies/jwt-refresh-token.strategy';
import { HelperService } from '../helper/helper.service';
import { MicroservicesList } from 'src/enums/global.enum';

const helperService = new HelperService(new ConfigService());
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_ACCESS_TOKEN'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME_ACCESS_TOKEN')
        }
      })
    })
  ],
  controllers: [AuthenticationsController],
  providers: [
    AuthenticationsService,
    AccessTokenStrategy,
    JwtRefreshTokenStrategy,
    ConfigService,
    helperService.rabbitMqConfig(MicroservicesList.userMicroService)
  ]
})
export class AuthenticationsModule {}
