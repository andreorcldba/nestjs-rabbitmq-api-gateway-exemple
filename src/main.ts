import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const port = configService.get('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  console.log(`Api gateway running on port ${port}`);
}
bootstrap();
