import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { LoginDto } from './dto/login.dto';
import { ConfiguracoesService } from '../configuracoes/configuracoes.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfiguracoesService,
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.usuariosService.findByEmail(dto.email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const senhaCorreta = await bcrypt.compare(dto.senha, usuario.senha);

    if (!senhaCorreta) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const accessToken = await this.gerarAccessToken(usuario.id);
    const refreshToken = await this.gerarRefreshToken(usuario.id);

    return {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async gerarAccessToken(id_usuario: number) {
    const accessExp = await this.configService.get('auth.jwt.access_expiration');

    return this.jwtService.signAsync(
      { sub: id_usuario },
      { expiresIn: accessExp },
    );
  }

  async gerarRefreshToken(id_usuario: number) {
    const refreshExp = await this.configService.get('auth.jwt.refresh_expiration');

    const token = await this.jwtService.signAsync(
      { sub: id_usuario },
      { expiresIn: refreshExp },
    );

    // extrai número de dias do formato "30d"
    const dias = parseInt(refreshExp.replace('d', ''), 10);

    const expiracao = new Date();
    expiracao.setDate(expiracao.getDate() + dias);

    const registro = this.refreshRepo.create({
      id_usuario,
      token,
      expiracao,
      valido: true,
    });

    await this.refreshRepo.save(registro);

    return token;
  }

  async refresh(token: string) {
    const registro = await this.refreshRepo.findOne({
      where: { token, valido: true },
    });

    if (!registro) {
      throw new UnauthorizedException('Refresh token inválido.');
    }

    if (registro.expiracao < new Date()) {
      registro.valido = false;
      await this.refreshRepo.save(registro);
      throw new UnauthorizedException('Refresh token expirado.');
    }

    const novoAccessToken = await this.gerarAccessToken(registro.id_usuario);

    return { accessToken: novoAccessToken };
  }

  async logout(token: string) {
    const registro = await this.refreshRepo.findOne({ where: { token } });

    if (!registro) {
      throw new BadRequestException('Token não encontrado.');
    }

    registro.valido = false;
    await this.refreshRepo.save(registro);

    return { message: 'Logout realizado com sucesso.' };
  }
}
