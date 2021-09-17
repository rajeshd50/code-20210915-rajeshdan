import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(helmet())
  app.use(compression())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    validationError: {
      value: true
    },
    forbidUnknownValues: true,
    stopAtFirstError: true
  }))
  app.useGlobalInterceptors(new ErrorInterceptor())
  app.enableShutdownHooks()
  app.use(json({limit: '100mb'}))
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
