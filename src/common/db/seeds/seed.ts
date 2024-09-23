import { DataSource } from 'typeorm';

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';

const seedDatabase = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  await dataSource.destroy();
};

seedDatabase()
  .then(() => console.log('Seeding completed.'))
  .catch((error) => console.error('Seeding failed:', error));
