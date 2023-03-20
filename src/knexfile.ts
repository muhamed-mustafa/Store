import knex from 'knex';
import { config } from './config';

export const database = knex({
  client: config.CLIENT,
  connection: {
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
  },
  pool: { min: 0, max: 10 }
});

database.raw('SELECT VERSION()').then(() => {
  console.log('CONNECTED TO DATABASE SUCCESSFULLY');
});
