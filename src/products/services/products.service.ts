import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  FliterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsServices: BrandsService,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll(params?: FliterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }

      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
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
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.find({
        where: changes.categoriesIds.map((categoryId) => ({ id: categoryId })),
      });
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
  remove(id: number) {
    return this.productRepo.delete(id);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }
  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    product.categories.push(category);
    return this.productRepo.save(product);
  }
}
