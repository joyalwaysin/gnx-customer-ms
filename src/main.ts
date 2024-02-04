/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { VersioningType, ValidationPipe, BadRequestException  } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use((req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).end();
    } else {
      next();
    }
  });

  const config = new DocumentBuilder()
    .setTitle('Assyst Secret Manager')
    .setDescription('Assyst Secret Manager API')
    .setVersion('1.0')
    // .addTag('Secret Manager1')
    .build();
  const v1Options = new DocumentBuilder()
    .setTitle('Assyst Secret Manager')
    .setDescription('Assyst Secret Manager API')
    .setVersion('1.0')
    // .addTag('Secret Manager1')
    .build();

  // Create Swagger documents
  const v1Document = SwaggerModule.createDocument(app, v1Options);

  // Serve Swagger UI for each version
  SwaggerModule.setup('api/v1.0', app, v1Document);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
