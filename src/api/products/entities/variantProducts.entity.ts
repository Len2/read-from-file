import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('variant_products')
export class VariantProduct {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  ProductID: string;

  @Column()
  ItemID: string;

  @Column()
  ProductName: string;

  @Column()
  ProductDescription: string;

  @Column()
  ManufacturerItemCode: string;

  @Column()
  ItemDescription: string;

  @Column()
  ImageFileName: string;

  @Column()
  ItemImageURL: string;

  @Column()
  NDCItemCode: string;
}
