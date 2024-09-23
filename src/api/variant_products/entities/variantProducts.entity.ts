import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('users')
export class VariantProduct {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  ProductID: string;

  // @Column()
  // ProductName: string;
  //
  // @Column()
  // ProductDescription: string;
  //
  // @Column()
  // ManufacturerItemCode: string;
  //
  // @Column()
  // ItemDescription: string;
  //
  // @Column()
  // ImageFileName: string;
  //
  // @Column()
  // ItemImageURL: string;
  //
  // @Column()
  // NDCItemCode: string;
}
