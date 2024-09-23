import 'dotenv/config';
import { DataSource } from 'typeorm';

const config = {
  type: process.env.TYPEORM_TYPE, // Explicitly set to 'mongodb'
  url: `mongodb://${process.env.TYPEORM_HOST}: ${process.env.TYPEORM_PORT}?authSource=${process.env.AUTH_SOURCE}`,
  database: process.env.TYPEORM_NAME,
  synchronize: true,
  dropSchema: false,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  logging: false,
  useUnifiedTopology: true,
};

export const AppDataSource = new DataSource(config as any);
