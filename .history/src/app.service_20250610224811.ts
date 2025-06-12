// NOUVEAU contenu de src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Mon App Echo-Note est sur GitHub ! 🚀';
  }
}