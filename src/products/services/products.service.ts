import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsServices: BrandsService,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }
  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: {
        id: id,
      },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException('Producto no existe');
    }
    return product;
  }
  async create(data: CreateProductDto) {
    /*const newProduct = new Product();
    newProduct.name = data.name;
    newProduct.description = data.description;
    newProduct.price = data.price;
    newProduct.stock = data.stock;
    newProduct.image = data.image;*/

    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandsServices.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.find({
        where: data.categoriesIds.map((categoryId) => ({ id: categoryId })),
      });
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }
  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });
    const brand = await this.brandsServices.findOne(changes.brandId);
    if (changes.brandId) {
      product.brand = brand;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
