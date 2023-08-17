import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  private counterId = 1;

  findAll() {
    return this.productRepo.find();
  }
  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Producto no existe');
    }
    return product;
  }
  create(data: CreateProductDto) {
    /*const newProduct = new Product();
    newProduct.name = data.name;
    newProduct.description = data.description;
    newProduct.price = data.price;
    newProduct.stock = data.stock;
    newProduct.image = data.image;*/

    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }
  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
