import { Pool } from 'pg';

export const pgPool = new Pool({
  database: 'microservice',
  username: 'readuser',
  password: 'sa',
  host: 'localhost',
  port: 5432,
  max: 140,
  idleTimeoutMillis: 30000,
});
