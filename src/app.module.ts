import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthenticationsModule } from './modules/authentications/authentications.module';
import { HelperModule } from './modules/helper/helper.module';
import { CitiesModule } from './modules/cities/cities.module';
import { FederalUnitsModule } from './modules/federal-units/federal-units.module';

@Module({
  imports: [UsersModule, AuthenticationsModule, HelperModule, FederalUnitsModule, CitiesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
