import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GenericExceptionFilter } from './exceptionsFilter/exceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GenericExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(8000);
}

bootstrap();
