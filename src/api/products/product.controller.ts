import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IProductController } from './interfaces';
import { Public } from '../../common/decorators';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DeleteProductsDto } from './dto/delete-products.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('product')
@Public()
@ApiTags('Products')
export class ProductController implements IProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a text file' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'File is not provided.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is not provided');
    }
    const savedFilePath = await this.productService.saveFile(file);
    return {
      message: 'File uploaded successfully',
      path: savedFilePath,
    };
  }

  @Public()
  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  @Get('read-files')
  @HttpCode(HttpStatus.OK)
  async readFile(): Promise<void> {
    return await this.productService.readFile();
  }

  @Public()
  @Delete()
  @ApiOperation({ summary: 'Delete multiple products by IDs' })
  @ApiResponse({ status: 200, description: 'Products successfully deleted.' })
  @ApiBody({ type: DeleteProductsDto })
  async delete(@Body() deleteProductsDto: DeleteProductsDto) {
    return await this.productService.removeProducts(deleteProductsDto.id);
  }

  @Public()
  @Get('getProduct')
  async getProducts(@Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const response = await this.productService.getAllProductsWithVariants(
      page,
      limit,
    );
    return { ok: true, data: response };
  }
}
