import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// --- Simulation d'une base de données d'utilisateurs ---
// Dans une vraie application, vous utiliseriez une base de données comme PostgreSQL avec TypeORM ou Prisma.
const users = [
  {
    id: 1,
    email: 'test@test.com',
    password: 'password123', // Dans la vraie vie, le mot de passe serait "hashé"
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
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = users.find((u) => u.email === email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects.');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user_info: user,
    };
  }
}