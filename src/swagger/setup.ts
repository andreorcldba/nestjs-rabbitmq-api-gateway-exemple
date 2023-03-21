import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerSetup {
  constructor() {}

  _setup(app: INestApplication) {
    const confirService = new ConfigService();
    const url = `http://localhost:${confirService.get('PORT')}/`;

    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API')
      .setVersion('1.0')
      .addBearerAuth()
      .addServer(url)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    const swaggerCustomOptions = {
      customCss: '.swagger-ui section.models { visibility: hidden;}'
    };
    SwaggerModule.setup('swagger', app, document, swaggerCustomOptions);
  }
}
