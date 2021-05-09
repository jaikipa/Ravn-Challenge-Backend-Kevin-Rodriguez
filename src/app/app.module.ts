import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { StoreModule } from '../store/store.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // App Env Vars
        PORT: Joi.number().default(3000),
        API_PREFIX: Joi.string().default('api/v1'),
        // TypeORM Env Vars
        ORM_CONNECTION: Joi.string().valid('postgres').default('postgres'),
        ORM_HOST: Joi.string().required(),
        ORM_USERNAME: Joi.string().required(),
        ORM_PASSWORD: Joi.string().required(),
        ORM_DATABASE: Joi.string().required(),
        ORM_TEST_DATABASE: Joi.string(),
        ORM_PORT: Joi.number().positive().integer().default(5432),
        ORM_MIGRATIONS_TABLE_NAME: Joi.string().default('migration'),
        ORM_MIGRATIONS: Joi.string().default('dist/migrations/*.js'),
        ORM_MIGRATIONS_DIR: Joi.string().default('migrations'),
        ORM_MIGRATIONS_RUN: Joi.boolean().default(true),
        ORM_SEEDS: Joi.string().default('src/seeds/**/*{.ts,.js}'),
        ORM_FACTORIES: Joi.string().default('src/seeds/factories/**/*{.ts,.js}'),
      }),
    }),
    StoreModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
