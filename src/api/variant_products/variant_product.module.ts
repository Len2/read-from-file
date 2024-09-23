import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomRepositoryModule } from '../../common/db';
import { VariantProductRepository } from './repositories/variant_product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantProduct } from './entities/variantProducts.entity';

@Module({
  imports: [
    JwtModule.register({}),
    CustomRepositoryModule.forCustomRepository([VariantProductRepository]),
    // TypeOrmModule.forFeature([VariantProduct]),
  ],
  // providers: [ProductService],
  // controllers: [ProductController],
  // exports: [ProductService],
})
export class VariantProductModule {}
