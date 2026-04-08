import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permissao } from './entities/permissao.entity';
import { RolePermissao } from './entities/role-permissao.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    @InjectRepository(Permissao)
    private permissaoRepo: Repository<Permissao>,

    @InjectRepository(RolePermissao)
    private rolePermissaoRepo: Repository<RolePermissao>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async usuarioTemPermissao(idUsuario: number, chave: string): Promise<boolean> {
    const usuario = await this.usuarioRepo.findOne({ where: { id: idUsuario } });

    if (!usuario || !usuario.id_role) return false;

    const permissao = await this.permissaoRepo.findOne({ where: { chave } });
    if (!permissao) return false;

    const relacao = await this.rolePermissaoRepo.findOne({
      where: {
        id_role: usuario.id_role,
        id_permissao: permissao.id,
      },
    });

    return !!relacao;
  }
}
