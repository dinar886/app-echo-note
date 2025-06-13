// src/main.ts (LA VERSION CORRECTE ET FINALE)
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // --- MODIFICATION DÉFINITIVE ---
  // On supprime l'option "prefix".
  // Maintenant, le serveur servira les fichiers directement depuis la racine.
  // L'URL /stylesheets/style.css fonctionnera.
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // ------------------------------

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();