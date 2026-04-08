import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioJwt } from './interfaces/usuario-jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SUA_CHAVE_SECRETA',
    });
  }

  async validate(payload: any): Promise<UsuarioJwt> {
    return { id: payload.sub };
  }
}
