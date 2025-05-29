import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/core/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT ?? 8000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(PORT);
  console.log(`\n\n Server running on http://localhost:${PORT}\n\n`);
}
/* eslint-disable @typescript-eslint/no-floating-promises */
bootstrap();
