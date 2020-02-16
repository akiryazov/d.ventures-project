import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository, UpdateResult, DeleteResult, Equal, Like } from 'typeorm';

const FILTERS_MAP = {
  id: (value) => Equal(value),
  title: (value) => Like(`%${value}%`),
  quantity: (value) => Equal(value),
  category: (value) => Equal(value),
  description: (value) => Like(`%${value}%`),
  createDate: (value) => Equal(value),
};

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
  }

  async findAll(query): Promise<Product[]> {
    let filters = {};
    Object.keys(query).forEach(key => {
      const operator = FILTERS_MAP[key];
      filters = {
        ...filters,
        [key]: operator(query[key]),
      };
    });
    return await this.productRepository.find(filters);
  }

  async findById(id): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(product: Product): Promise<UpdateResult> {
    return await this.productRepository.update(product.id, product);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
