import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permissao } from './entities/permissao.entity';
import { RolePermissao } from './entities/role-permissao.entity';
import { RbacService } from './rbac.service';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permissao, RolePermissao, Usuario]),
  ],
  providers: [RbacService],
  exports: [RbacService],
})
export class RbacModule {}
