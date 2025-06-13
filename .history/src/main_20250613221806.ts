// src/main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs'; // <--- AJOUT : Importer hbs

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Votre configuration de préfixe est correcte.
  // Cela signifie que les liens dans le HTML devront commencer par /public/
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // --- AJOUT NÉCESSAIRE ---
  // Permet de convertir un objet en JSON dans nos fichiers .hbs
  hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
  });
  // -------------------------

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();