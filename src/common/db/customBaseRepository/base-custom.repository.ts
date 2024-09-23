import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IBaseCustomRepository } from './interfaces';

export abstract class BaseCustomRepository<T>
  extends Repository<T>
  implements IBaseCustomRepository<T>
{
  async findOne(options: FindOneOptions<T>): Promise<T> {
    return await super.findOne({
      ...options,
      where: {
        ...options?.where,
        //deleted_at: null,
      },
    });
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return await super.find({
      ...options,
      where: {
        ...options?.where,
        //  deleted_at: null,
      },
    });
  }
}
