import { Injectable, NotFoundException } from '@nestjs/common';

// --- Réutilisation de la base de données simulée ---
const users = [
    {
      id: 1,
      email: 'test@test.com',
      password: 'password123',
      isPremium: true,
      noAds: true,
      questionsLeft: 9999,
    },
    {
      id: 2,
      email: 'user@test.com',
      password: 'password',
      isPremium: false,
      noAds: false,
      questionsLeft: 20,
    },
  ];
// --- Fin de la simulation ---

@Injectable()
export class UserService {
    getUserInfo(userId: number) {
        const user = users.find(u => u.id === userId);
        if(!user) {
            throw new NotFoundException("Utilisateur non trouvé.");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userInfo } = user;
        return {
            success: true,
            ...userInfo
        };
    }
}