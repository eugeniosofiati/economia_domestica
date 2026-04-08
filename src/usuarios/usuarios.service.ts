import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entity/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const emailExiste = await this.repo.findOne({ where: { email: dto.email } });

    if (emailExiste) {
      throw new BadRequestException('E-mail já está em uso.');
    }

    const senhaHash = await bcrypt.hash(dto.senha, 10);

    const usuario = this.repo.create({
      ...dto,
      senha: senhaHash,
      ativo: true,
    });

    return this.repo.save(usuario);
  }

  async findAll(status: string = 'ativos'): Promise<Usuario[]> {
    if (status === 'inativos') {
      return this.repo.find({ where: { ativo: false }, order: { id: 'DESC' } });
    }

    if (status === 'todos') {
      return this.repo.find({ order: { id: 'DESC' } });
    }

    return this.repo.find({ where: { ativo: true }, order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.repo.findOne({
      where: { id, ativo: true },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado ou inativo.`);
    }

    return usuario;
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);

    if (dto.senha) {
      dto.senha = await bcrypt.hash(dto.senha, 10);
    }

    Object.assign(usuario, dto);

    return this.repo.save(usuario);
  }

  async remove(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);

    usuario.ativo = false;

    return this.repo.save(usuario);
  }
}
