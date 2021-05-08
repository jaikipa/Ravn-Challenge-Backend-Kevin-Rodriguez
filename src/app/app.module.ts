import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi = require('joi');
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        API_PREFIX: Joi.string().default('api/v1'),
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
