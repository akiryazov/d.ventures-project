import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Connection } from 'typeorm';
import { GenericExceptionFilter } from './exceptionsFilter/exceptionsFilter';

@Module({
  imports: [TypeOrmModule.forRoot(), ProductsModule],
  providers: [GenericExceptionFilter],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
  }
}
