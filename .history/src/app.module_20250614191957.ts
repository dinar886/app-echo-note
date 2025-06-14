import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    // Charger les variables d'environnement depuis le fichier .env
    ConfigModule.forRoot({
      isGlobal: true, // Rend le ConfigModule disponible globalement
    }),
    AuthModule,
    UserModule,
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}