import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const apiPrefix = configService.get<string>('API_PREFIX');

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, validationError: { target: false } }));

  const options = new DocumentBuilder()
    .setTitle('Keller Williams - Agents Service')
    .setDescription('Service for Agents context')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  await app.listen(port);
  Logger.log(`Listening on port: ${port}`, AppModule.name);
}
bootstrap();
