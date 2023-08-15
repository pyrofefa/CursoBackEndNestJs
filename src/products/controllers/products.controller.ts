import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  //ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @ApiOperation({ summary: 'Obtener lista de productos.' })
  @Get()
  getProducts() {
    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `Yo soy un filter`;
  }
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.productService.remove(+id);
  }
}
