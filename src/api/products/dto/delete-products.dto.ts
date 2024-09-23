import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductsDto {
  @ApiProperty({
    description: ' ID to delete',
    example: '34k5jn34j6345nkn345',
  })
  id: string;
}
