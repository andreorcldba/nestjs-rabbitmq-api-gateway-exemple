import { Module } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsController } from './authentications.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../../strategies/access-token.strategy';
import { JwtRefreshTokenStrategy } from '../../strategies/jwt-refresh-token.strategy';
import { MicroservicesList } from 'src/enums/global.enum';
import { OutputTransportsService } from 'src/output-transports/output-transports.transports';

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
    OutputTransportsService.rabbitMqClient(MicroservicesList.userMicroService)
  ]
})
export class AuthenticationsModule {}
