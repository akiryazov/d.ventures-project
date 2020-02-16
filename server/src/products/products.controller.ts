import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
  }

  @Get()
  findAll(@Query() query): Promise<Product[]> {
    return this.productsService.findAll(query);
  }

  @Get('/:id')
  findById(@Param('id') id): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Post('create')
  async create(@Body() productData: Product): Promise<any> {
    return this.productsService.create(productData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() productData: Product): Promise<any> {
    productData.id = Number(id);
    return this.productsService.update(productData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.productsService.delete(id);
  }
}
