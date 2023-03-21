import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetup } from './swagger/setup';

async function bootstrap() {
  const swagger = new SwaggerSetup();
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const port = configService.get('PORT') || 3000;

  swagger._setup(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  console.log(`Api gateway running on port ${port}`);
}
bootstrap();
