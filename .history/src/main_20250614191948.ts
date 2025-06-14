import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Activer CORS pour permettre à votre application Flutter de communiquer avec l'API
  app.enableCors();

  // Activer la validation automatique des données entrantes (DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Retirer les propriétés qui ne sont pas dans le DTO
      transform: true, // Transformer les données entrantes dans leur type de DTO
    }),
  );

  // Définir un préfixe global pour toutes les routes (ex: /api/v1/auth/login)
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();