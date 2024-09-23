import { CustomRepository } from '../../../common/db/decorators';
import { IProductRepository } from '../interfaces';
import { Product } from '../entities/products.entity';
import { BaseCustomRepository } from '../../../common/db';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(Product)
export class ProductRepository
  extends BaseCustomRepository<Product>
  implements IProductRepository
{
  async saveData(data): Promise<Product[]> {
    const products = this.create(data);
    return await this.save(products);
  }

  async deleteProductById(id: string) {
    const result = await this.delete({ ProductID: id });
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }
}
