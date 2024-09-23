import { Product } from '../entities/products.entity';

export interface IProductRepository {
  saveData(data): Promise<Product[]>;
}
