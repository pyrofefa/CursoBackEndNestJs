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
import { ParseIntPipe } from '../common/parse-int/parse-int.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

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
  create(@Body() payload: any) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.productService.remove(+id);
  }
}
