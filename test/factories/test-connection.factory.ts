import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTestConnection = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  schema: process.env.ORM_SCHEMA,
  database: process.env.ORM_TEST_DATABASE,
  entities: ['src/**/entities/*.ts'],
  migrations: [process.env.ORM_MIGRATIONS],
  migrationsTableName: process.env.ORM_MIGRATIONS_TABLE_NAME,
  migrationsRun: true,
});
