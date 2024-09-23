import { CustomRepository } from '../../../common/db';
import { BaseCustomRepository } from '../../../common/db';
import { VariantProduct } from '../entities/variantProducts.entity';

@CustomRepository(VariantProduct)
export class VariantProductRepository extends BaseCustomRepository<VariantProduct> {
  async saveData(data): Promise<VariantProduct[]> {
    const variantRepo = this.create(data);
    return await this.save(variantRepo);
  }
}
