import { DataSource } from 'typeorm';
import { env } from 'shared/config/env';
import { Event } from './entities/Event';
import { User } from './entities/User';
import { Language } from './entities/Language';

export const dataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT) || 5432,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Event, Language],
  ssl: {
    ca: env.MYSQL_SSL_CA_CERT,
  },
  legacySpatialSupport: false,
});
