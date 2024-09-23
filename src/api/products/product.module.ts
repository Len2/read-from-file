import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomRepositoryModule } from '../../common/db';
import { ProductRepository, VariantProductRepository } from './repositories';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    JwtModule.register({}),
    CustomRepositoryModule.forCustomRepository([
      ProductRepository,
      VariantProductRepository,
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
