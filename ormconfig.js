// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = [
  {
    name: 'default',
    type: process.env.ORM_CONNECTION,
    host: process.env.ORM_HOST,
    port: parseInt(process.env.ORM_PORT, 10),
    username: process.env.ORM_USERNAME,
    password: process.env.ORM_PASSWORD,
    schema: process.env.ORM_SCHEMA,
    database: process.env.ORM_DATABASE,
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    migrations: [process.env.ORM_MIGRATIONS],
    migrationsTableName: [process.env.ORM_MIGRATIONS_TABLE_NAME],
    logging: true,
    migrationsRun: true,
    cli: {
      migrationsDir: process.env.ORM_MIGRATIONS_DIR,
    },
  },
  {
    name: 'test',
    type: process.env.ORM_CONNECTION,
    host: process.env.ORM_HOST,
    username: process.env.ORM_USERNAME,
    password: process.env.ORM_PASSWORD,
    port: parseInt(process.env.ORM_PORT, 10),
    database: process.env.ORM_TEST_DATABASE,
    schema: process.env.ORM_SCHEMA,
    entities: [process.env.ORM_ENTITIES],
    migrations: [process.env.ORM_MIGRATIONS],
    migrationsTableName: [process.env.ORM_MIGRATIONS_TABLE_NAME],
    migrationsRun: true,
    cli: {
      migrationsDir: process.env.ORM_MIGRATIONS_DIR,
    },
  },
];
