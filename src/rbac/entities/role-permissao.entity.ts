import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('role_permissoes')
export class RolePermissao {
  @PrimaryColumn()
  id_role: number;

  @PrimaryColumn()
  id_permissao: number;
}
