import { CustomRepository } from '../../../common/db/decorators';
import { BaseCustomRepository } from '../../../common/db';
import { VariantProduct } from '../entities/variantProducts.entity';

@CustomRepository(VariantProduct)
// implements IProductRepository
export class VariantProductRepository extends BaseCustomRepository<VariantProduct> {
  // async saveData(data): Promise<VariantProduct[]> {
  //   const products = this.create(data);
  //   return await this.save(products);
  // }
  // async findOneByUuid(uuid: string): Promise<User> {
  //   const user = await this.findOne({ where: { uuid } });
  //
  //   if (!user) {
  //     throw new NotFoundException('User not found!');
  //   }
  //
  //   return user;
  // }
  //
  // async findOneByEmail(email: string): Promise<User> {
  //   const user = await this.findOne({ where: { email } });
  //
  //   if (!user) {
  //     throw new NotFoundException('User not found!');
  //   }
  //
  //   return user;
  // }
  //
  // async updateUser(
  //   userId: string,
  //   updateUserDto?: Partial<UpdateUserDto> & {
  //     password?: string;
  //     hashed_rt?: string;
  //   },
  // ): Promise<User> {
  //   const user = await this.findOneByUuid(userId);
  //
  //   Object.assign(user, updateUserDto);
  //
  //   return await this.save(user);
  // }
  //
  // async removeUser(userId: string): Promise<void> {
  //   const user = await this.findOneByUuid(userId);
  //   await this.remove(user);
  // }
}
