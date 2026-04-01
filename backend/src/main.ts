import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                // Remove campos não declarados no DTO
      forbidNonWhitelisted: true,     // Retorna erro para campos extras
      transform: true,                // Transforma tipos automaticamente
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  const porta = process.env.PORT ?? 3000;
  await app.listen(porta);

  console.log(`\n API rodando em: http://localhost:${porta}/api`);
  console.log(`Rotas disponíveis:`);
  console.log(`   GET    /api/oportunidades`);
  console.log(`   GET    /api/oportunidades?status=aberta&cliente=Tech`);
  console.log(`   GET    /api/oportunidades/:id`);
  console.log(`   POST   /api/oportunidades`);
  console.log(`   PATCH  /api/oportunidades/:id`);
  console.log(`   DELETE /api/oportunidades/:id`);
  console.log(`   GET    /api/dashboard/resumo\n`);
}

bootstrap();
