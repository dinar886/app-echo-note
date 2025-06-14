import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Cette méthode est appelée par Passport pour valider le payload du token
  async validate(payload: any) {
    // Le payload contient { email: '...', sub: 1, iat: ..., exp: ... }
    // Ce que nous retournons ici sera attaché à l'objet `request.user`
    return { userId: payload.sub, email: payload.email };
  }
}