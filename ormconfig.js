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
    entities: [__dirname + '/**/*.entity.js'],
    migrations: [process.env.ORM_MIGRATIONS],
    migrationsTableName: [process.env.ORM_MIGRATIONS_TABLE_NAME],
    logging: true,
    migrationsRun: true,
    cli: {
      migrationsDir: process.env.ORM_MIGRATIONS_DIR,
    },
    seeds: [__dirname + '/**/seeds/*.js'],
    factories: [__dirname + '/**/factories/*.js'],
  },
];
