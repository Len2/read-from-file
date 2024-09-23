import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { IAuditEntity } from './interfaces';
import { BaseEntity } from './';

export abstract class AuditEntity extends BaseEntity implements IAuditEntity {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
