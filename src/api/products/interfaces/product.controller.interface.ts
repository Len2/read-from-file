import { Product } from '../entities/products.entity';
import { UploadedFile } from '@nestjs/common';
import { Express } from 'express';

export interface IProductController {
  uploadFile(file: Express.Multer.File): any;
  readFile(): Promise<void>;
}
