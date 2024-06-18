import process from 'process';
import * as fs from 'fs';
import { DataSource } from 'typeorm';
import { Event } from './entities/Event';
import { User } from './entities/User';
import { Language } from './entities/Language';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Event, Language],
  ssl: {
    ca: fs.readFileSync(`${__dirname}/crtx/mysql-ca.pem`),
  },
  legacySpatialSupport: false,
});
