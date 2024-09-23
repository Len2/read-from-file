import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NestEmitterModule } from 'nest-emitter';
import { EventEmitter } from 'stream';

import { AppDataSource } from './config';
import { VariantProductModule } from './api/variant_products/variant_product.module';
import { ProductModule } from './api/products/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    NestEmitterModule.forRoot(new EventEmitter()),
    ProductModule,
    //VariantProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
