export interface IProductService {
  saveFile(file: Express.Multer.File): Promise<string>;
  readFile(chunkSize);
}
