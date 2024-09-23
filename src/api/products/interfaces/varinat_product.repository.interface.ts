import { VariantProduct } from '../entities/variantProducts.entity';

export interface IVariantProductRepository {
  saveData(data): Promise<VariantProduct[]>;
}
