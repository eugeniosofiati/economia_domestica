import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshToken } from './entities/refresh-token.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';
import { RefreshStrategy } from './refresh.strategy';
import { ConfiguracoesModule } from '../configuracoes/configuracoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    UsuariosModule,
    ConfiguracoesModule, // <-- ADICIONADO
    JwtModule.register({
      secret: 'SUA_CHAVE_SECRETA',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshStrategy],
})
export class AuthModule {}
