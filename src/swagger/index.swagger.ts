import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Minha API')
      .setDescription('Documentação da minha API')
      .setVersion('1.0')
      .addTag('Usuários', 'Operações relacionadas a usuários')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }
}
