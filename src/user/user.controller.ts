import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard) // Protège cette route, seul un utilisateur connecté peut y accéder
  @Get('info')
  getUserInfo(@Request() req) {
    // req.user est peuplé par le JwtStrategy avec { userId: ..., email: ... }
    const userId = req.user.userId;
    return this.userService.getUserInfo(userId);
  }
}