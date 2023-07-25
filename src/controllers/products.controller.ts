import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    //return `Product limit => ${limit} offset => ${offset} brand => ${brand}`;
    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `Yo soy un filter`;
  }

  /*@Get(':id')
  getProduct(@Res() response: Response, @Param('id') id: string) {
    response.status(200).send({
      message: `Product ${id}`,
    });
  }*/

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id') id: string) {
    /*return {
      message: `Product ${id}`,
    };*/
    return this.productService.findOne(+id);
  }

  @Post()
  create(@Body() payload: any) {
    /*return {
      message: 'Accion de crear',
      payload,
    };*/
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    /*return {
      id,
      payload,
    };*/
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    //return id;
    return this.productService.remove(+id);
  }
}
