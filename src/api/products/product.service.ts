import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductService } from './interfaces';
import { ProductRepository, VariantProductRepository } from './repositories';
import { writeFileSync, mkdirSync, createReadStream } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private productRepository: ProductRepository,
    private variantProductRepository: VariantProductRepository,
  ) {}

  async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadPath = join(process.cwd(), 'uploads_products');
    mkdirSync(uploadPath, { recursive: true });
    const filePath = join(uploadPath, 'images40.txt');
    writeFileSync(filePath, file.buffer);
    return filePath;
  }

  async readFile(chunkSize = 100) {
    const filePath = join(process.cwd(), 'uploads_products/images40.txt');
    const fileStream = createReadStream(filePath, { encoding: 'utf8' });

    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let chunk: string[] = [];
    const headers: string[] = [];
    let isHeaderParsed = false;

    for await (const line of rl) {
      chunk.push(line);
      if (chunk.length >= chunkSize) {
        await this.processChunk(chunk, headers, isHeaderParsed);
        isHeaderParsed = true;
        chunk = [];
      }
    }

    if (chunk.length > 0) {
      await this.processChunk(chunk, headers, isHeaderParsed);
    }

    console.log('File reading completed.');
  }

  async processChunk(
    chunk: string[],
    headers: string[],
    isHeaderParsed: boolean,
  ) {
    if (!isHeaderParsed) {
      const firstLine = chunk[0].trim();
      headers.push(...firstLine.split(/\t/));
      chunk.shift();
    }

    const formattedData = chunk.map((line) => {
      const values = line.split(/\t/);
      const rowObject: { [key: string]: string | null } = {};

      headers.forEach((col, index) => {
        rowObject[col] = values[index] || null;
      });
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(rowObject);
        }, 800);
      });
    });

    const resolvedData = await Promise.all(formattedData);
    await this.prepareToSaveProductVariant(resolvedData);
    await this.prepareToSaveProduct(resolvedData);
  }

  private async prepareToSaveProductVariant(formattedData) {
    const itemIds = formattedData.map((item) => String(item.ItemID));
    const existingItemIdsSet = new Set();

    for (const itemId of itemIds) {
      const existingProduct = await this.variantProductRepository.findOne({
        where: { ItemID: itemId },
      });

      if (existingProduct) {
        existingItemIdsSet.add(existingProduct.ItemID);
      }
    }
    const newProducts = [];
    const updates = [];

    for (const item of formattedData) {
      const itemId = String(item.ItemID);
      const productData = {
        _id: existingItemIdsSet.has(itemId)
          ? undefined
          : new ObjectId().toString(),
        ProductID: item.ProductID,
        ItemID: itemId,
        ProductName: item.ProductName,
        ProductDescription: item.ProductDescription,
        ManufacturerItemCode: item.ManufacturerItemCode,
        ItemDescription: item.ItemDescription,
        ImageFileName: item.ImageFileName || 'image.jpg',
        ItemImageURL: item.ItemImageURL || 'url',
        NDCItemCode: item.NDCItemCode,
      };

      if (existingItemIdsSet.has(itemId)) {
        updates.push({ ItemID: itemId, ...productData });
      } else {
        newProducts.push(productData);
      }
    }

    if (newProducts.length) {
      return this.variantProductRepository.saveData(newProducts);
    }
    if (updates.length) {
      await this.updateExistingProducts(updates);
    }
  }

  private async updateExistingProducts(updates) {
    for (const update of updates) {
      await this.variantProductRepository.update(
        { ItemID: update.ItemID },
        {
          ProductID: update.ProductID,
          ProductName: update.ProductName,
          ProductDescription: update.ProductDescription,
          ManufacturerItemCode: update.ManufacturerItemCode,
          ItemDescription: update.ItemDescription,
          ImageFileName: update.ImageFileName,
          ItemImageURL: update.ItemImageURL,
          NDCItemCode: update.NDCItemCode,
        },
      );
    }
  }

  private async prepareToSaveProduct(formattedData) {
    const itemIds = formattedData.map((item) => String(item.ItemID));
    const productIds = formattedData.map((item) => String(item.ProductID));

    const existingItemIdsSet = await this.getExistingItemIds(itemIds);
    const existingProductIdsSet = await this.getExistingProductIds(productIds);

    const { newProducts, updates } = this.splitDataForSaveAndUpdate(
      formattedData,
      existingItemIdsSet,
      existingProductIdsSet,
    );

    if (newProducts.length) {
      await this.productRepository.saveData(newProducts);
    }

    if (updates.length) {
      await this.updateExistingProducts(updates);
    }
  }

  private async getExistingItemIds(itemIds) {
    const existingItemIdsSet = new Set();

    for (const itemId of itemIds) {
      const existingProduct = await this.productRepository.findOne({
        where: { ItemID: itemId },
      });

      if (existingProduct) {
        existingItemIdsSet.add(existingProduct.ItemID);
      }
    }

    return existingItemIdsSet;
  }

  private async getExistingProductIds(productIds) {
    const existingProductIdsSet = new Set();

    for (const productId of productIds) {
      const existingProduct = await this.productRepository.findOne({
        where: { ProductID: productId },
      });

      if (existingProduct) {
        existingProductIdsSet.add(existingProduct.ProductID);
      }
    }

    return existingProductIdsSet;
  }

  private splitDataForSaveAndUpdate(
    formattedData,
    existingItemIdsSet,
    existingProductIdsSet,
  ) {
    const newProducts = [];
    const updates = [];

    for (const item of formattedData) {
      const itemId = String(item.ItemID);
      const productId = String(item.ProductID);
      const productData = {
        _id:
          existingItemIdsSet.has(itemId) || existingProductIdsSet.has(productId)
            ? undefined
            : new ObjectId().toString(),
        SiteSource: item.SiteSource,
        ItemID: itemId,
        ManufacturerID: item.ManufacturerID,
        ManufacturerCode: item.ManufacturerCode,
        ManufacturerName: item.ManufacturerName,
        ProductID: productId,
        UnitPrice: item.UnitPrice,
        Availability: item.Availability,
        IsRX: item.IsRX,
        IsTBD: item.IsTBD,
        CategoryID: item.CategoryID,
      };

      if (existingProductIdsSet.has(productId)) {
        updates.push({ ItemID: itemId, ProductID: productId, ...productData });
      } else {
        const isDuplicateInNewData = newProducts.some(
          (product) => product.ProductID === productId,
        );
        if (!isDuplicateInNewData) {
          newProducts.push(productData);
        }
      }
    }

    return { newProducts, updates };
  }

  async removeProducts(id: string): Promise<void> {
    try {
      const variantExists = await this.variantProductRepository.findOne({
        where: { ProductID: id },
      });
      if (variantExists) {
        throw new NotFoundException(
          'Variant product exists with the same ProductID. Skipping deletion.',
        );
      } else {
        await this.productRepository.deleteProductById(id);
      }
    } catch (error) {
      throw new Error(`Error deleting products: ${error.message}`);
    }
  }

  async getAllProductsWithVariants(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const [products, total] = await this.productRepository.findAndCount({
      skip: offset,
      take: limit,
    });
    const productsWithVariants = await Promise.all(
      products.map(async (product) => {
        const variants = await this.variantProductRepository.find({
          where: { ProductID: product.ProductID },
        });
        return { product, variants };
      }),
    );
    return {
      products: productsWithVariants,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
