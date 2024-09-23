import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('products')
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  docId: string;

  @Column()
  status: string;

  @Column()
  SiteSource: string;

  @Column({ unique: true })
  ItemID: string;

  @Column()
  ManufacturerID: string;

  @Column()
  ManufacturerCode: string;

  @Column()
  ManufacturerName: string;

  @Column()
  ProductID: string;

  @Column()
  UnitPrice: string;

  @Column()
  Availability: string;

  @Column()
  IsRX: string;

  @Column()
  IsTBD: string;

  @Column()
  CategoryID: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
