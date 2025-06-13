// src/main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // --- ON REMET LA CONFIGURATION D'ORIGINE QUI MARCHE ---
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  // ----------------------------------------------------

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();