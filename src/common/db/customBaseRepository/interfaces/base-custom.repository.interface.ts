import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AuditEntity } from '../../customBaseEntites';

export interface IBaseCustomRepository<T> {
  findOne(options: FindOneOptions<T>): Promise<T>;
  find(options?: FindManyOptions<T>): Promise<T[]>;
}
