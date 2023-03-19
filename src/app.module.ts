import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthenticationsModule } from './modules/authentications/authentications.module';
import { HelperModule } from './modules/helper/helper.module';

@Module({
  imports: [UsersModule, AuthenticationsModule, HelperModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
